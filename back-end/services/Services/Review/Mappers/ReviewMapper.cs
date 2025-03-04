using services.Services.Review.DTOs;
using services.Models;

namespace services.Services.Review.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewModel CreateReview(ReviewDto dto, string firstName)
        {
            return new ReviewModel {
                Name = firstName,
                Content = dto.Content,
                Rating = dto.Rating
            };
        }

        public static ReviewDto CreateReviewDto(ReviewModel reviewModel)
        {
            return new ReviewDto {
                Content = reviewModel.Content,
                Rating = reviewModel.Rating
            };
        }
    }
}