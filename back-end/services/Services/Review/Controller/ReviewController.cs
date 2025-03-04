using Microsoft.AspNetCore.Mvc;
using services.Services.Review.DTOs;
using services.Services.Review.Interfaces;
using services.Extensions;
using Microsoft.AspNetCore.Identity;
using services.Models;
using Microsoft.AspNetCore.Authorization;

namespace services.Services.Review.Controller
{
    [Route("reviews")]
    [ApiController]
    public class ReviewController(IReviewRepo reviewRepo, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> userManager = userManager;
        private readonly IReviewRepo reviewRepo = reviewRepo;

        [HttpPost("submit")]
        [Authorize]
        public async Task<IActionResult> Submit([FromBody] ReviewDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            await reviewRepo.CreateReviewAsync(dto, appUser.FirstName);
            
            appUser.HasReview = true;
            var result = await userManager.UpdateAsync(appUser);

            if (!result.Succeeded)
                return StatusCode(500, "Failed to update user review status");

            return Created("/reviews/submit/success", dto);
        }

        [HttpGet("fetch-reviews")]
        public async Task<IActionResult> FetchTopReviews()
        {
            var reviews = await reviewRepo.GetTopReviewsAsync();

            if (reviews.Count == 0)
                return NoContent();

            return Ok(reviews);
        }
    }
}