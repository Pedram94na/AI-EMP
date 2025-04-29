using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace services.Models
{
    [Table("Messages")]
    public class MessageModel
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;

        [ForeignKey("Customers")]
        public int CustomerID { get; set; }
        public CustomerModel? Customer { get; set; }
    }
}