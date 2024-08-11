using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VideoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Video
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Video>>> GetVideos()
        {
            return await _context.Videos.Include(v => v.Student).ToListAsync();
        }

        // GET: api/Video/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Video>> GetVideo(int id)
        {
            var video = await _context.Videos
                                      .Include(v => v.Student)
                                      .FirstOrDefaultAsync(v => v.VideoId == id);

            if (video == null)
            {
                return NotFound();
            }

            return video;
        }

        // POST: api/Video
        [HttpPost]
        public async Task<ActionResult<Video>> CreateVideo(Video video)
        {
            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVideo), new { id = video.VideoId }, video);
        }

        // PUT: api/Video/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id, Video video)
        {
            if (id != video.VideoId)
            {
                return BadRequest();
            }

            _context.Entry(video).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Video/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if video exists
        private bool VideoExists(int id)
        {
            return _context.Videos.Any(e => e.VideoId == id);
        }
    }
}
