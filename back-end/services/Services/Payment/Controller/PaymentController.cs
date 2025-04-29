using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using services.Extensions;
using services.Models;
using services.Services.Payment.DTOs;
using services.Services.Payment.Interfaces;

namespace services.Services.Payment.Controller
{
    [Route("payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IStripeService stripeService;

        public PaymentController( UserManager<AppUser> userManager, IStripeService stripeService)
        {
            this.userManager = userManager;
            this.stripeService = stripeService;
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
                var paymentIntent = await stripeService.ProcessPaymentAsync(dto);

                return Ok(new StripeDto
                        {
                            PaymentIntentId = paymentIntent.Id,
                            Amount = dto.Amount,
                            Currency = dto.Currency,
                            Status = paymentIntent.Status
                        });
            }

            catch (Exception e)
            {
                return StatusCode(500, $"Error Processing Payment: {e.Message}");
            }
        }
    }
}
