using services.Services.Subscription.Interfaces;
using services.Services.Subscription.DTOs;

namespace services.Services.Subscription.Repositories
{
    public class NewSubscriptionPlanStrategy : INewSubscriptionPlanStrategy
    {
        public NewSubscriptionPlanDto CreateNewSubscriptionPlan(int planId)
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