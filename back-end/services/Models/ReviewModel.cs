using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace services.Models
{
    [Table("Reviews")]
    public class ReviewModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Content { get; set; } = String.Empty;
        public int Rating { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}