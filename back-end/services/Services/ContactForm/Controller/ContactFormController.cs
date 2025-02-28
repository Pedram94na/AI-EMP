using Microsoft.AspNetCore.Mvc;
using services.Services.ContactForm.DTOs;
using services.Services.ContactForm.Interfaces;

namespace services.Services.ContactForm.Controller
{
    [Route("contact-form")]
    [ApiController]
    public class ContactFormController(IContactFormRepo contactFormRepo) : ControllerBase
    {
        private readonly IContactFormRepo contactFormRepo = contactFormRepo;

        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] ContactFormDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var customerModel = await contactFormRepo.CreateCustomerAsync(dto);
            
            await contactFormRepo.CreateMessageAsync(dto, customerModel.Id);
            
            return Created("/api/contact/submit/success", dto);
        }
    }
}