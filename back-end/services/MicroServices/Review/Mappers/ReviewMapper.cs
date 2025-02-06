using services.MicroServices.Review.DTOs;
using services.MicroServices.Review.Models;

namespace services.MicroServices.Review.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewModel CreateReview(ReviewDto dto)
        {
            return new ReviewModel {
                Name = dto.Name,
                Content = dto.Content,
                Rating = dto.Rating
            };
        }

        public static ReviewDto CreateReviewDto(ReviewModel reviewModel)
        {
            return new ReviewDto {
                Name = reviewModel.Name,
                Content = reviewModel.Content,
                Rating = reviewModel.Rating
            };
        }
    }
}