using Microsoft.AspNetCore.Mvc;
using services.Services.Review.DTOs;
using services.Services.Review.Interfaces;
using services.Extensions;

namespace services.Services.Review.Controller
{
    [Route("reviews")]
    [ApiController]
    public class ReviewController(IReviewRepo reviewRepo) : ControllerBase
    {
        private readonly IReviewRepo reviewRepo = reviewRepo;

        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] ReviewDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await reviewRepo.CreateReviewAsync(dto);

            return Created("/reviews/submit/success", dto);
        }

        [HttpGet("fetch-reviews")]
        public async Task<IActionResult> FetchTopReviews()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reviews = await reviewRepo.GetTopReviewsAsync();

            if (reviews.Count == 0)
                return NoContent();

            return Ok(reviews);
        }
    }
}