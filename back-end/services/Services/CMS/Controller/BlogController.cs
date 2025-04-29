using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using services.Extensions;
using services.Services.CMS.DTOs;
using services.Services.CMS.Interfaces;
using services.Services.CMS.Mappers;
using services.Models;

namespace services.Services.CMS.Controller
{
    [Route("blog")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IBlogRepo blogRepo;
        private readonly string imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        public BlogController(UserManager<AppUser> userManager, IBlogRepo blogRepo)
        {
            this.userManager = userManager;
            this.blogRepo = blogRepo;

            if (!Directory.Exists(imageDirectory))
                Directory.CreateDirectory(imageDirectory);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateNewBlog([FromForm] CreateBlogDto dto, [FromForm] IFormFile imageFile)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/";

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            Console.WriteLine(appUser.Role);
            Console.WriteLine(UserRole.Admin.ToString() + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

            if (appUser.Role.ToUpper() != UserRole.Admin.ToString().ToUpper())
                return Unauthorized();

            string? imagePath = null;
            if (imageFile != null && imageFile.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(imageDirectory, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await imageFile.CopyToAsync(fileStream);

                imagePath = Path.Combine("images", fileName);
            }

            if (imagePath is null)
                return BadRequest();

            var blogModel = dto.CreateNewBlog(appUser, baseUrl);
            blogModel.ImageDir = imagePath;
            
            blogModel = await blogRepo.CreateBlogAsync(blogModel);
            
            return Ok(blogModel.ToBlogDto(baseUrl));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> EditBlog([FromRoute] int id, [FromForm] EditBlogDto updateBlogDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/";

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            if (appUser.Role != UserRole.Admin.ToString())
                return Unauthorized();

            var existingBlogModel = await blogRepo.GetByIdAsync(id);

            if (existingBlogModel is null)
                return NotFound("Blog not found");

            var imagePath = existingBlogModel.ImageDir;

            var editedBlogModel = updateBlogDto.ToBlogFromEditedBlogDto(appUser);
            editedBlogModel.ImageDir = imagePath;

            var newBlogModel = await blogRepo.EditBlogAsync(existingBlogModel, editedBlogModel);

            return newBlogModel is null ? NotFound("Blog not found") : Ok(newBlogModel.ToBlogDto(baseUrl));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/";
            var blogs = await blogRepo.GetAllAsync();
            
            var blogsDto = blogs.Select(b => b.ToBlogDto(baseUrl)).ToList();

            return Ok(blogsDto);
        }
    }
}