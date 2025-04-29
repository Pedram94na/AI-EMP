using Microsoft.AspNetCore.Mvc;
using services.Services.ContactForm.DTOs;
using services.Services.ContactForm.Interfaces;
using services.Services.ContactForm.Mappers;

namespace services.Services.ContactForm.Controller
{
    [Route("contact")]
    [ApiController]
    public class ContactFormController(IContactFormRepo contactFormRepo) : ControllerBase
    {
        private readonly IContactFormRepo contactFormRepo = contactFormRepo;
        
        [HttpPost()]
        public async Task<IActionResult> Submit([FromBody] ContactFormDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customerModel = dto.CreateCustomer();
            customerModel = await contactFormRepo.FindExistingCustomer(customerModel);

            var messageModel = dto.CreateMessage(customerModel);
            await contactFormRepo.CreateMessageAsync(messageModel);
            
            return Created("/api/contact/submit/success", dto);
        }
    }
}