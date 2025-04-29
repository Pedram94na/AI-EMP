using services.Data;
using services.Services.ContactForm.Interfaces;
using services.Models;
using Microsoft.EntityFrameworkCore;

namespace services.Services.ContactForm.Repositories
{
    public class ContactFormRepo : IContactFormRepo
    {
        private readonly ApplicationDbContext context;

        public ContactFormRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<CustomerModel> FindExistingCustomer(CustomerModel model)
        {
            var existingCustomer = await context.Customers.FirstOrDefaultAsync(
                c => c.Name == model.Name && c.EmailAddress == model.EmailAddress
            );

            return existingCustomer is not null ? existingCustomer : model;
        }

        public async Task<MessageModel> CreateMessageAsync(MessageModel model)
        {
            await context.Messages.AddAsync(model);
            await context.SaveChangesAsync();

            return model;
        }
    }
}