using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Models;
using services.Services.Subscription.Interfaces;

namespace services.Services.Subscription.Repositories
{
    public class SubscriptionPlanRepo : ISubscriptionPlanRepo
    {
        private ApplicationDbContext context;

        public SubscriptionPlanRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> IsSubscribed(AppUser appUser)
        {
            return await context.Subscriptions.AnyAsync(s => s.AppUserId == appUser.Id);
        }

        public async Task<Models.SubscriptionModel> CreateSubscriptionPlanAsync(Models.SubscriptionModel subscriptionPlanModel)
        {
            await context.Subscriptions.AddAsync(subscriptionPlanModel);
            await context.SaveChangesAsync();

            return subscriptionPlanModel;
        }
    }
}