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

        public SubscriptionController(UserManager<AppUser> userManager, ISubscriptionPlanRepo subscriptionPlanRepo)
        {
            this.userManager = userManager;
            this.subscriptionPlanRepo = subscriptionPlanRepo;
        }
        
        [HttpPost]
        // [Authorize("User")]
        public async Task<IActionResult> CreateSubscription([FromBody] CreateSubscriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var subscriptionPlanModel = dto.FromCreateSubscriptionDtoToModel(appUser);
            await subscriptionPlanRepo.CreateSubscriptionPlanAsync(subscriptionPlanModel);

            return Ok(subscriptionPlanModel.FromModelToSubscriptionPlanDto());
        }

        [HttpDelete]
        // [Authorize("User")]
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

            return Ok(subscriptionPlanModel.FromModelToSubscriptionPlanDto());
        }
    }
}