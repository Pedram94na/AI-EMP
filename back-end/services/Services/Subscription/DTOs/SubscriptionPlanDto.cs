namespace services.Services.Subscription.DTOs
{
    public class SubscriptionPlanDto
    {
        public float Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool HasExpired { get; set; }
    }
}