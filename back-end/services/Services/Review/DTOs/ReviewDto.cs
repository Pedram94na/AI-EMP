using System.ComponentModel.DataAnnotations;

namespace services.Services.Review.DTOs
{
    public class ReviewDto
    {
        [Required]
        public int Rating { get; set; }
        
        [Required]
        public string Content { get; set; } = String.Empty;
    }
}