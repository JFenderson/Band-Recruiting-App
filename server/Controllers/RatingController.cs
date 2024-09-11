using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly RatingService _ratingService;

        public RatingController(RatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpPost("student/{studentId}/rate")]
        public async Task<IActionResult> RateStudent(string studentId, [FromBody] RatingDTO ratingDto)
        {
            var rating = await _ratingService.AddOrUpdateRatingAsync(studentId, ratingDto.RecruiterId, ratingDto.Score);
            return Ok(rating);
        }
    }
}
