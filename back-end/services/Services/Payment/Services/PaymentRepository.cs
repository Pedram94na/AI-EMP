using services.Services.Payment.DTOs;
using services.Services.Payment.Interfaces;
using Stripe;

namespace services.Services.Payment.Repositories
{
    public class StripeService : IStripeService
    {
        public StripeService(IConfiguration configuration)
        {
            StripeConfiguration.ApiKey = configuration["Stripe:SecretKey"];
        }

        public async Task<PaymentIntent> ProcessPaymentAsync(PaymentDto dto)
        {
            var paymentIntentService = new PaymentIntentService();
            var paymentIntentOptions = new PaymentIntentCreateOptions
            {
                Amount = (long)(dto.Amount * 100),
                Currency = dto.Currency,
                PaymentMethod = dto.PaymentMethodId,
                Confirm = true,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                    AllowRedirects = "never"
                }
            };

            return await paymentIntentService.CreateAsync(paymentIntentOptions);
        }
    }
}