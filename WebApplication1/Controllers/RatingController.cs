using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RatingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rating/Student/5
        [HttpGet("Student/{studentId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatingsByStudent(int studentId)
        {
            return await _context.Ratings.Where(r => r.StudentId == studentId).ToListAsync();
        }

        // GET: api/Rating/Band/5
        [HttpGet("Band/{bandId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatingsByBand(int bandId)
        {
            return await _context.Ratings.Where(r => r.BandId == bandId).ToListAsync();
        }

        // GET: api/Rating/Video/5
        [HttpGet("Video/{videoId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatingsByVideo(int videoId)
        {
            return await _context.Ratings.Where(r => r.VideoId == videoId).ToListAsync();
        }

        // POST: api/Rating
        [HttpPost]
        public async Task<ActionResult<Rating>> AddRating(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRatingsByStudent), new { studentId = rating.StudentId }, rating);
        }

        // DELETE: api/Rating/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
