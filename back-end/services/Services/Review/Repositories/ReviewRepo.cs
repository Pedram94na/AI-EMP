using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Services.Review.Interfaces;
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

        public async Task<bool> HasReview(AppUser appUser)
        {
            return await context.Reviews.AnyAsync(r => r.AppUserId == appUser.Id);
        }

        public async Task<Models.ReviewModel> CreateReviewAsync(Models.ReviewModel model)
        {
            await context.Reviews.AddAsync(model);
            await context.SaveChangesAsync();

            return model;
        }

        public async Task<List<Models.ReviewModel>> GetTopReviewsAsync()
        {
            return await context.Reviews
                .Where(r => r.Rating > 4)
                .ToListAsync();
        }
    }
}