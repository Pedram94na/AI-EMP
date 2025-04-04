using System.ComponentModel.DataAnnotations;

namespace services.Services.ContactForm.DTOs
{
    public class ContactFormDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Can not be over 10 characters")]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = string.Empty;
        
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        
        [Url]
        public string WebsiteUrl { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}