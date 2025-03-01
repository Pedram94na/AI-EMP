using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Services.ContactForm.DTOs;
using services.Services.ContactForm.Interfaces;
using services.Services.ContactForm.Mappers;
using services.Models;

namespace services.Services.ContactForm.Repositories
{
    public class ContactFormRepo : IContactFormRepo
    {
        private readonly ApplicationDbContext context;

        public ContactFormRepo(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<CustomerModel> CreateCustomerAsync(ContactFormDto contactFormDto)
        {
            var customerModel = ContactFormMapper.CreateCustomer(contactFormDto);
            var existingCustomer = await context
                                    .Customers
                                    .FirstOrDefaultAsync(c =>
                                        c.Name == contactFormDto.Name &&
                                        c.EmailAddress == contactFormDto.EmailAddress);
                                        
            if (existingCustomer is not null)
                return existingCustomer;

            await context.Customers.AddAsync(customerModel);
            await context.SaveChangesAsync();

            return customerModel;
        }

        public async Task<MessageModel> CreateMessageAsync(ContactFormDto contactFormDto, int id)
        {
            var messageModel = ContactFormMapper.CreateMessage(contactFormDto, id);

            await context.Messages.AddAsync(messageModel);
            await context.SaveChangesAsync();

            return messageModel;
        }
    }
}