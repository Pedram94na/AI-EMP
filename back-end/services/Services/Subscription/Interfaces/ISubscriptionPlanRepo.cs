using services.Models;

namespace services.Services.Subscription.Interfaces
{
    public interface ISubscriptionPlanRepo
    {
        Task<SubscriptionPlanModel> CreateSubscriptionPlanAsync(SubscriptionPlanModel subscriptionPlanModel);
        Task<SubscriptionPlanModel> CancelSubscriptionPlanAsync(SubscriptionPlanModel subscriptionPlanModel);
    }
}