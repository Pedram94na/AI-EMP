using services.Services.CMS.DTOs;
using services.Models;

namespace services.Services.CMS.Mappers
{
    public static class BlogMappers
    {
        public static BlogModel CreateNewBlog(this CreateBlogDto dto, AppUser appUser)
        {
            return new BlogModel {
                Author = $"{appUser.FirstName} {appUser.LastName}",
                Title = dto.Title,
                Content = dto.Content,
                // Image = dto.Image,
                CreatedOn = DateTime.Today,
                EditedOn = DateTime.Today,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }
        
        public static BlogDto ToBlogDto(this BlogModel blog)
        {
            return new BlogDto {
                Author = blog.Author,
                Title = blog.Title,
                Content = blog.Content,
                // Image = dto.Image,
                CreatedOn = blog.CreatedOn,
                EditedOn = blog.EditedOn
            };
        }

        public static BlogModel ToBlogFromEditedBlogDto(this EditBlogDto dto, AppUser appUser)
        {
            return new BlogModel {
                Title = dto.Title,
                Content = dto.Content,
                // Image = dto.Image,
                EditedOn = DateTime.Today,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }
    }
}