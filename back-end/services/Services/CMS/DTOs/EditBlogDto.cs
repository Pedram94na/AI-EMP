using System.ComponentModel.DataAnnotations;

namespace services.Services.CMS.DTOs
{
    public class EditBlogDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Can not be less than 3 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(500, ErrorMessage = "Can not be more than 500 characters")]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string Image_Dir { get; set; } = string.Empty;
        public DateTime EditedOn { get; set; } = DateTime.Today;
    }
}