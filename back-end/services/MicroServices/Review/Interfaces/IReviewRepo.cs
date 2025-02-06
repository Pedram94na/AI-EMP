using services.MicroServices.Review.DTOs;
using services.MicroServices.Review.Models;

namespace services.MicroServices.Review.Interfaces
{
    public interface IReviewRepo
    {
        Task<ReviewModel> CreateReviewAsync(ReviewDto dto);
        Task<List<ReviewModel>> GetTopReviewsAsync();
    }
}