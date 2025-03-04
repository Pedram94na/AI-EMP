using services.Services.Subscription.DTOs;

namespace services.Services.Subscription.Interfaces
{
    public interface INewSubscriptionPlanStrategy
    {
        NewSubscriptionPlanDto CreateNewSubscriptionPlan(int planId);
    }
}