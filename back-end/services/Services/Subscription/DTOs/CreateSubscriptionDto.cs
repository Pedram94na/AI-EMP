namespace services.Services.Subscription.DTOs
{
    public class CreateSubscriptionDto
    {
        public DateTime StartDate { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}