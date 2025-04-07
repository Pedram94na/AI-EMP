using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Services.CMS.Interfaces;
using services.Models;

namespace services.Services.CMS.Repositories
{
    public class BlogRepo : IBlogRepo
    {
        private readonly ApplicationDbContext context;

        public BlogRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<BlogModel> CreateBlogAsync(BlogModel blog)
        {
            await context.Blogs.AddAsync(blog);
            await context.SaveChangesAsync();

            return blog;
        }

        public async Task<BlogModel?> EditBlogAsync(BlogModel existingBlog, BlogModel editedBlog)
        {
            existingBlog.Author = existingBlog.Author;
            existingBlog.Title = editedBlog.Title;
            existingBlog.Content = editedBlog.Content;
            existingBlog.CreatedOn = existingBlog.CreatedOn;
            existingBlog.EditedOn = editedBlog.EditedOn;
            existingBlog.ImageDir = editedBlog.ImageDir;
            existingBlog.ImageUrl = editedBlog.ImageUrl;
            existingBlog.AppUserId = existingBlog.AppUserId;
            existingBlog.AppUser = existingBlog.AppUser;

            await context.SaveChangesAsync();

            return existingBlog;
        }

        public async Task<BlogModel?> DeleteBlogAsync(BlogModel existingBlog)
        {
            context.Blogs.Remove(existingBlog);
            await context.SaveChangesAsync();

            return existingBlog;
        }

        public async Task<List<BlogModel>> GetAllAsync()
        {
            return await context.Blogs.ToListAsync();
        }

        public async Task<BlogModel?> GetByIdAsync(int id)
        {
            return await context.Blogs.FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}