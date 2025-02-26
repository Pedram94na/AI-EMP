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

        public async Task<SubscriptionPlanModel> CreateSubscriptionPlanAsync(SubscriptionPlanModel subscriptionPlanModel)
        {
            await context.SubscriptionPlans.AddAsync(subscriptionPlanModel);
            await context.SaveChangesAsync();

            return subscriptionPlanModel;
        }

        public async Task<SubscriptionPlanModel> CancelSubscriptionPlanAsync(SubscriptionPlanModel subscriptionPlanModel)
        {
            context.SubscriptionPlans.Remove(subscriptionPlanModel);
            await context.SaveChangesAsync();

            return subscriptionPlanModel;
        }
    }
}