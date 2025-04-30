using services.Models;

namespace services.Services.Subscription.Interfaces
{
    public interface ISubscriptionPlanRepo
    {
        Task<bool> IsSubscribed(AppUser appUser);
        Task<SubscriptionModel> CreateSubscriptionPlanAsync(SubscriptionModel subscriptionPlanModel);
    }
}