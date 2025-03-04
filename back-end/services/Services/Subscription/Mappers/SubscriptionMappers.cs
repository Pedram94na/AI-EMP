using services.Models;
using services.Services.Subscription.DTOs;

namespace services.Services.Subscription.Mappers
{
    public static class SubscriptionMappers
    {
        public static SubscriptionPlanModel FromCreateSubscriptionDtoToModel(this NewSubscriptionPlanDto dto, AppUser appUser)
        {
            return new SubscriptionPlanModel {
                Price = dto.Price,
                StartDate = DateTime.Today,
                ExpirationDate = dto.ExpirationDate,
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }

        public static SubscriptionPlanModel FromCancelSubscriptionDtoToModel(this CancelSubscriptionPlanDtp dto, AppUser appUser)
        {
            return new SubscriptionPlanModel {
                AppUserId = appUser.Id,
                AppUser = appUser
            };
        }

        public static SubscriptionPlanDto FromModelToSubscriptionPlanDto(this SubscriptionPlanModel model)
        {
            return new SubscriptionPlanDto {
                Price = model.Price,
                StartDate = model.StartDate,
                ExpirationDate = model.ExpirationDate
            };
        }
    }
}