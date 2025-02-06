using System.ComponentModel.DataAnnotations.Schema;

namespace services.MicroServices.ContactForm.Models
{
    [Table("Message")]
    public class MessageModel
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public int CustomerID { get; set; }
    }
}