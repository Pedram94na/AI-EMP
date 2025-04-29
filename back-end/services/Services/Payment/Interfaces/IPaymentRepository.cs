using services.Services.Payment.DTOs;
using Stripe;

namespace services.Services.Payment.Interfaces
{
    public interface IStripeService
    {
        Task<PaymentIntent> ProcessPaymentAsync(PaymentDto dto);
    }
}