using services.Models;

namespace services.Services.CMS.Interfaces
{
    public interface IBlogRepo
    {
        Task<BlogModel> CreateBlogAsync(BlogModel blog);
        Task<BlogModel?> EditBlogAsync(BlogModel existingBlog, BlogModel editedBlog);
        Task<BlogModel?> DeleteBlogAsync(BlogModel existingBlog);
        Task<List<BlogModel>> GetAllAsync();
        Task<BlogModel?> GetByIdAsync(int id);
    }
}