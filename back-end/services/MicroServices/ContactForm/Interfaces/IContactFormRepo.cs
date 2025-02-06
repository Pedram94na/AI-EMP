using services.MicroServices.ContactForm.DTOs;
using services.MicroServices.ContactForm.Models;

namespace services.MicroServices.ContactForm.Interfaces
{
    public interface IContactFormRepo
    {
        Task<CustomerModel> CreateCustomerAsync(ContactFormDto contactFormDto);
        Task<MessageModel> CreateMessageAsync(ContactFormDto contactFormDto, int id);
    }
}