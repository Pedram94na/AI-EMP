using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Services.Review.DTOs;
using services.Services.Review.Interfaces;
using services.Services.Review.Mappers;
using services.Models;

namespace services.Services.Review.Repositories
{
    public class ReviewRepo : IReviewRepo
    {
        private readonly ApplicationDbContext context;

        public ReviewRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<ReviewModel> CreateReviewAsync(ReviewDto dto, string firstName)
        {
            var reviewModel = ReviewMapper.CreateReview(dto, firstName);
            var existingReview = await context.Reviews.FirstOrDefaultAsync(r => r.Name == firstName);

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