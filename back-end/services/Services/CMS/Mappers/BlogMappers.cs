using services.Services.CMS.DTOs;
using services.Models;

namespace services.Services.CMS.Mappers
{
    public static class BlogMappers
    {
        public static BlogModel CreateNewBlog(this CreateBlogDto dto, AppUser appUser, string baseUrl)
        {
            return new BlogModel {
                Author = $"{appUser.FirstName} {appUser.LastName}",
                Title = dto.Title,
                Content = dto.Content,
                CreatedOn = DateTime.Today,
                EditedOn = DateTime.Today,
                ImageDir = dto.ImageDir,
                ImageUrl = baseUrl + Path.GetFileName(dto.ImageDir),
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }
        
        public static BlogDto ToBlogDto(this BlogModel blog, string baseUrl)
        {
            return new BlogDto {
                Id = blog.Id,
                Author = blog.Author,
                Title = blog.Title,
                Content = blog.Content,
                ImageDir = blog.ImageDir,
                ImageUrl = baseUrl + Path.GetFileName(blog.ImageDir),
                CreatedOn = blog.CreatedOn,
                EditedOn = blog.EditedOn
            };
        }

        public static BlogModel ToBlogFromEditedBlogDto(this EditBlogDto dto, AppUser appUser)
        {
            return new BlogModel {
                Title = dto.Title,
                Content = dto.Content,
                ImageDir = dto.Image_Dir,
                EditedOn = DateTime.Today,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }
    }
}