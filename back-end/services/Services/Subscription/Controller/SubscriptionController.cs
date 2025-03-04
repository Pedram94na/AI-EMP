using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using services.Extensions;
using services.Models;
using services.Services.Subscription.DTOs;
using services.Services.Subscription.Interfaces;
using services.Services.Subscription.Mappers;

namespace services.Services.Subscription.Controller
{
    [Route("subscription")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly ISubscriptionPlanRepo subscriptionPlanRepo;
        private readonly INewSubscriptionPlanStrategy newSubscriptionPlanStrategy;

        public SubscriptionController(UserManager<AppUser> userManager, ISubscriptionPlanRepo subscriptionPlanRepo, INewSubscriptionPlanStrategy newSubscriptionPlanStrategy)
        {
            this.userManager = userManager;
            this.subscriptionPlanRepo = subscriptionPlanRepo;
            this.newSubscriptionPlanStrategy = newSubscriptionPlanStrategy;
        }
        
        [HttpPost("new-subscription/{planId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateSubscription([FromRoute] int planId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            try
            {
                var dto = newSubscriptionPlanStrategy.CreateNewSubscriptionPlan(planId);

                var subscriptionPlanModel = dto.FromCreateSubscriptionDtoToModel(appUser);
                await subscriptionPlanRepo.CreateSubscriptionPlanAsync(subscriptionPlanModel);

                appUser.HasSubscribed = true;
                await userManager.UpdateAsync(appUser);

                return Ok(subscriptionPlanModel.FromModelToSubscriptionPlanDto());
            }

            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("cancel-subscription")]
        [Authorize]
        public async Task<IActionResult> CancelSubscription([FromBody] CancelSubscriptionPlanDtp dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var isSubscribed = appUser.CurrentSubscriptionPlan is not null;

            if (!isSubscribed)
                return NotFound("User is not subscribed");

            var subscriptionPlanModel = dto.FromCancelSubscriptionDtoToModel(appUser);
            await subscriptionPlanRepo.CancelSubscriptionPlanAsync(subscriptionPlanModel);

            appUser.HasSubscribed = false;
            await userManager.UpdateAsync(appUser);

            return Ok(subscriptionPlanModel.FromModelToSubscriptionPlanDto());
        }
    }
}