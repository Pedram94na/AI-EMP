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

        public BlogController(UserManager<AppUser> userManager, IBlogRepo blogRepo)
        {
            this.userManager = userManager;
            this.blogRepo = blogRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateNewBlog([FromBody] CreateBlogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var blogModel = dto.CreateNewBlog(appUser);
            
            blogModel = await blogRepo.CreateBlogAsync(blogModel);
            
            return Ok(blogModel.ToBlogDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> EditBlog([FromRoute] int id, [FromBody] EditBlogDto updateBlogDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var existingBlogModel = await blogRepo.GetByIdAsync(id);

            if (existingBlogModel is null)
                return NotFound("Blog not found");

            var editedBlogModel = updateBlogDto.ToBlogFromEditedBlogDto(appUser);

            var newBlogModel = await blogRepo.EditBlogAsync(existingBlogModel, editedBlogModel);

            return newBlogModel is null ? NotFound("Blog not found") : Ok(newBlogModel.ToBlogDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteBlog([FromRoute] int id)
        {
            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var existingBlogModel = await blogRepo.GetByIdAsync(id);

            if (existingBlogModel is null)
                return NotFound("Blog not found");

            var deletedBlogModel = await blogRepo.DeleteBlogAsync(existingBlogModel);

            return deletedBlogModel is null ? NotFound("Blog not found") : NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogs = await blogRepo.GetAllAsync();
            var blogsDto = blogs.Select(b => b.ToBlogDto()).ToList();

            return Ok(blogsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var blog = await blogRepo.GetByIdAsync(id);

            return blog is null ? NotFound("Blog not found") : Ok(blog.ToBlogDto());
        }
    }
}