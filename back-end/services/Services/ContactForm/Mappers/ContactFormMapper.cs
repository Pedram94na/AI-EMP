using services.Services.ContactForm.DTOs;
using services.Models;

namespace services.Services.ContactForm.Mappers
{
    public static class ContactFormMapper
    {
        public static CustomerModel CreateCustomer(ContactFormDto dto)
        {
            return new CustomerModel {
                Name = dto.Name,
                EmailAddress = dto.EmailAddress,
                PhoneNumber = dto.PhoneNumber,
                CompanyName = dto.CompanyName,
                WebsiteUrl = dto.WebsiteUrl,
            };
        }

        public static MessageModel CreateMessage(ContactFormDto dto, int id)
        {
            return new MessageModel {
                Email = dto.EmailAddress,
                Content = dto.Content,
                CustomerID = id
            };
        }
    }
}