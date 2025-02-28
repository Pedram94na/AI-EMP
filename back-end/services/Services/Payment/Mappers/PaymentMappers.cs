using services.Models;
using services.Services.Payment.DTOs;
using Stripe;

namespace services.Services.Payment.Mappers
{
    public static class PaymentMapper
    {
        public static PaymentModel FromPaymentDtoToModel(this PaymentDto dto, PaymentIntent paymentIntent)
        {
            return new PaymentModel
            {
                PaymentIntentId = paymentIntent.Id,
                Amount = dto.Amount,
                Currency = dto.Currency,
                Status = paymentIntent.Status
            };
        }
    }
}