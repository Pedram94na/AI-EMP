using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace services.Models
{
    [Table("SubscriptionPlans")]
    public class SubscriptionPlanModel
    {
        [Key]
        public int Id { get; set; }
        public float Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}