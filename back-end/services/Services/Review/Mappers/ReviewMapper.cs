using services.Services.Review.DTOs;
using services.Models;

namespace services.Services.Review.Mappers
{
    public static class ReviewMapper
    {
        public static Models.ReviewModel CreateReviewFromDto(this ReviewDto dto, AppUser appUser)
        {
            return new Models.ReviewModel {
                Name = appUser.FirstName,
                Content = dto.Content,
                Rating = dto.Rating,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }

        public static ReviewDto CreateReviewDto(this Models.ReviewModel reviewModel)
        {
            return new ReviewDto {
                Content = reviewModel.Content,
                Rating = reviewModel.Rating
            };
        }
    }
}