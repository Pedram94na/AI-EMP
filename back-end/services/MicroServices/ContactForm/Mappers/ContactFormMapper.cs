using services.MicroServices.ContactForm.DTOs;
using services.MicroServices.ContactForm.Models;

namespace services.MicroServices.ContactForm.Mappers
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