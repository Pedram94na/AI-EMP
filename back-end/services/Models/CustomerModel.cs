using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace services.Models
{
    [Table("Customers")]
    public class CustomerModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string EmailAddress { get; set; } = String.Empty;
        public string? PhoneNumber { get; set; } = String.Empty;
        public string? CompanyName { get; set; } = String.Empty;
        public string? WebsiteUrl { get; set; } = String.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public List<MessageModel> Messages { get; set; } = [];
    }
}