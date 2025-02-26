using services.Services.Review.DTOs;
using services.Models;

namespace services.Services.Review.Interfaces
{
    public interface IReviewRepo
    {
        Task<ReviewModel> CreateReviewAsync(ReviewDto dto);
        Task<List<ReviewModel>> GetTopReviewsAsync();
    }
}