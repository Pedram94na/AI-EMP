using services.Services.Subscription.DTOs;

namespace services.Services.Subscription.Repositories
{
    public static class SubscriptionPlanFactory
    {
        public static CreateSubscriptionPlanDto CreateSubscription(int planId)
        {
            return planId switch
            {
                1 => new MonthlySubscriptionPlanDto(),
                2 => new YearlySubscriptionPlanDto(),
                _ => throw new ArgumentException("ERROR: Invalid subscription plan id"),
            };
        }
    }
}