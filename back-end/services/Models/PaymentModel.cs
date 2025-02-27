using System.ComponentModel.DataAnnotations;

namespace services.Models
{
    public enum PaymentStatus
    {
        Pending,
        Success,
        Failed
    }

    public class PaymentModel
    {
        [Key]
        public int Id { get; set; }
        public string CustomerId { get; set; } = string.Empty; // New field to track customer
        public float Amount { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    }
}
