using System.ComponentModel.DataAnnotations;

namespace services.Services.Payment.DTOs
{
    public class PaymentDto
    {
        [Required]
        public string PaymentMethodId { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }
        
        [Required]
        public string Currency { get; set; } = String.Empty;
    }
}
