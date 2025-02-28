using Microsoft.AspNetCore.Mvc;
using services.Services.Payment.DTOs;
using services.Services.Payment.Interfaces;
using services.Services.Payment.Mappers;

namespace services.Services.Payment.Controller
{
    [Route("payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository paymentRepo;

        public PaymentController(IPaymentRepository paymentRepo)
        {
            this.paymentRepo = paymentRepo;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
