namespace services.Services.Payment.DTOs
{
    public class PaymentDto
    {
        public string PaymentMethodId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = String.Empty;
    }
}
