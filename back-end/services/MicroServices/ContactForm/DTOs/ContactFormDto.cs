namespace services.MicroServices.ContactForm.DTOs
{
    public class ContactFormDto
    {
        public string Name { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}