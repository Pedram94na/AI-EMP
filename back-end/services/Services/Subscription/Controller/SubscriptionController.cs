using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using services.Extensions;
using services.Models;
using services.Services.Subscription.DTOs;
using services.Services.Subscription.Interfaces;
using services.Services.Subscription.Mappers;
using services.Services.Subscription.Repositories;

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
        
        [HttpPost("{planId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateSubscription([FromRoute] int planId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var isSubscribed = await subscriptionPlanRepo.IsSubscribed(appUser);
            if (isSubscribed)
                return Conflict("You are already subscribed!");
                
            try
            {
                var dto = SubscriptionPlanFactory.CreateSubscription(planId);

                var subscriptionPlanModel = dto.FromCreateSubscriptionDtoToModel(appUser);
                await subscriptionPlanRepo.CreateSubscriptionPlanAsync(subscriptionPlanModel);

                return Ok(subscriptionPlanModel.FromModelToSubscriptionPlanDto());
            }

            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}