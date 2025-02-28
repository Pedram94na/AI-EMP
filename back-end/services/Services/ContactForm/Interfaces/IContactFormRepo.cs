using services.Services.ContactForm.DTOs;
using services.Models;

namespace services.Services.ContactForm.Interfaces
{
    public interface IContactFormRepo
    {
        Task<CustomerModel> CreateCustomerAsync(ContactFormDto contactFormDto);
        Task<MessageModel> CreateMessageAsync(ContactFormDto contactFormDto, int id);
    }
}