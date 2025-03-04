using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using services.Extensions;
using services.Models;
using services.Services.Payment.DTOs;
using services.Services.Payment.Interfaces;
using services.Services.Payment.Mappers;

namespace services.Services.Payment.Controller
{
    [Route("payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IPaymentRepository paymentRepo;

        public PaymentController( UserManager<AppUser> userManager, IPaymentRepository paymentRepo)
        {
            this.userManager = userManager;
            this.paymentRepo = paymentRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            try
            {
                var PaymentIntent = await paymentRepo.ProcessPaymentAsync(dto);
                var model = dto.FromPaymentDtoToModel(PaymentIntent);

                return Ok(model);
            }

            catch (Exception e)
            {
                return StatusCode(500, $"Error Processing Payment: {e.Message}");
            }
        }
    }
}
