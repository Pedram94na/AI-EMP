using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Models;
using services.Services.User.Interfaces;

namespace services.Services.User.Repository
{
    public class UserStatusRepository : IUserStatusRepository
    {
        private readonly ApplicationDbContext context;

        public UserStatusRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> HasReviewAsync(AppUser appUser)
        {
            return await context.Reviews.AnyAsync(r => r.AppUserId == appUser.Id);
        }

        public async Task<bool> IsSubscribedAsync(AppUser appUser)
        {
            return await context.Subscriptions.AnyAsync(s => s.AppUserId == appUser.Id);
        }
    }
}