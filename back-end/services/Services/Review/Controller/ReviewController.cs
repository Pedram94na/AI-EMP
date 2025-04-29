using Microsoft.AspNetCore.Mvc;
using services.Services.Review.DTOs;
using services.Services.Review.Interfaces;
using services.Extensions;
using Microsoft.AspNetCore.Identity;
using services.Models;
using Microsoft.AspNetCore.Authorization;
using services.Services.Review.Mappers;

namespace services.Services.Review.Controller
{
    [Route("review")]
    [ApiController]
    public class ReviewController(IReviewRepo reviewRepo, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> userManager = userManager;
        private readonly IReviewRepo reviewRepo = reviewRepo;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Submit([FromBody] ReviewDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await userManager.FindByNameAsync(username);

            if (appUser is null)
                return NotFound("User not found");

            var hasReview = await reviewRepo.HasReview(appUser);
            if (hasReview)
                return Conflict("You already have a review!");

            var reviewModel = dto.CreateReviewFromDto(appUser);
            await reviewRepo.CreateReviewAsync(reviewModel);

            return Created("/review/submit/success", dto);
        }

        [HttpGet]
        public async Task<IActionResult> FetchTopReviews()
        {
            var reviews = await reviewRepo.GetTopReviewsAsync();
            
            if (reviews.Count == 0)
                return NoContent();

            return Ok(reviews);
        }
    }
}