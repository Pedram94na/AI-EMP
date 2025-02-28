namespace services.Models
{
    public class PaymentModel
    {
        public string PaymentIntentId { get; set; } = String.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = String.Empty;
        public string Status { get; set; } = String.Empty;
    }
}
