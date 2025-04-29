using services.Models;
using services.Services.Subscription.DTOs;

namespace services.Services.Subscription.Mappers
{
    public static class SubscriptionMappers
    {
        public static SubscriptionModel FromCreateSubscriptionDtoToModel(this CreateSubscriptionPlanDto dto, AppUser appUser)
        {
            return new SubscriptionModel {
                Price = dto.Price,
                StartDate = DateTime.Today,
                ExpirationDate = dto.ExpirationDate,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }

        public static SubscriptionPlanDto FromModelToSubscriptionPlanDto(this SubscriptionModel model)
        {
            return new SubscriptionPlanDto {
                Price = model.Price,
                StartDate = model.StartDate,
                ExpirationDate = model.ExpirationDate
            };
        }
    }
}