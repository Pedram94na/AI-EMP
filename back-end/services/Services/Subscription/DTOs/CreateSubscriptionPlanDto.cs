namespace services.Services.Subscription.DTOs
{
    public abstract class CreateSubscriptionPlanDto
    {
        public float Price { get; set; }
        public DateTime ExpirationDate { get; set; }
    }

    public class MonthlySubscriptionPlanDto : CreateSubscriptionPlanDto
    {
        public MonthlySubscriptionPlanDto()
        {
            Price = 10f;
            ExpirationDate = DateTime.Today.AddMonths(1);
        }
    }

    public class YearlySubscriptionPlanDto : CreateSubscriptionPlanDto
    {
        public YearlySubscriptionPlanDto()
        {
            Price = 100f;
            ExpirationDate = DateTime.Today.AddMonths(12);
        }
    }
}
