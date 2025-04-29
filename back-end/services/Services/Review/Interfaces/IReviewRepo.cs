using services.Models;

namespace services.Services.Review.Interfaces
{
    public interface IReviewRepo
    {
        Task<bool> HasReview(AppUser appUser);
        Task<Models.ReviewModel> CreateReviewAsync(Models.ReviewModel model);
        Task<List<Models.ReviewModel>> GetTopReviewsAsync();
    }
}