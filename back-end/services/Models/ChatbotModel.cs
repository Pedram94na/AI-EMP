using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace services.Models
{
    [Table("Chatbots")]
    public class ChatbotModel
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; } = String.Empty;
        public string Answer { get; set; } = String.Empty;
    }
}