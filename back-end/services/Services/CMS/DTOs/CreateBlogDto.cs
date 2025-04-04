using System.ComponentModel.DataAnnotations;

namespace services.Services.CMS.DTOs
{
    public class CreateBlogDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string ImageDir { get; set; } = string.Empty;
    }
}