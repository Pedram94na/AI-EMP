using System.ComponentModel.DataAnnotations;

namespace services.Services.ContactForm.DTOs
{
    public class ContactFormDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string EmailAddress { get; set; } = string.Empty;
        
        public string PhoneNumber { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        
        public string WebsiteUrl { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}