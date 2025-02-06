using Microsoft.EntityFrameworkCore;
using services.Data;
using services.MicroServices.Review.DTOs;
using services.MicroServices.Review.Interfaces;
using services.MicroServices.Review.Mappers;
using services.MicroServices.Review.Models;

namespace services.MicroServices.Review.Repositories
{
    public class ReviewRepo : IReviewRepo
    {
        private readonly ApplicationDbContext context;

        public ReviewRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<ReviewModel> CreateReviewAsync(ReviewDto dto)
        {
            var reviewModel = ReviewMapper.CreateReview(dto);
            var existingReview = await context
                                    .Reviews
                                    .FirstOrDefaultAsync(r =>
                                        r.Name == reviewModel.Name &&
                                        r.Content == reviewModel.Content &&
                                        r.Rating == reviewModel.Rating);

            if (existingReview is not null)
                return existingReview;

            await context.Reviews.AddAsync(reviewModel);
            await context.SaveChangesAsync();

            return reviewModel;
        }

        public async Task<List<ReviewModel>> GetTopReviewsAsync()
        {
            return await context.Reviews
                .Where(r => r.Rating > 4)
                .ToListAsync();
        }
    }
}