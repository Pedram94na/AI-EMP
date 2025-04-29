using services.Models;

namespace services.Services.ContactForm.Interfaces
{
    public interface IContactFormRepo
    {
        Task<CustomerModel> FindExistingCustomer(CustomerModel model); 
        Task<MessageModel> CreateMessageAsync(MessageModel model);
    }
}