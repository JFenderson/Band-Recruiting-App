using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Comment/Student/5
        [HttpGet("Student/{studentId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByStudent(int studentId)
        {
            return await _context.Comments.Where(c => c.StudentId == studentId).ToListAsync();
        }

        // GET: api/Comment/Band/5
        [HttpGet("Band/{bandId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByBand(int bandId)
        {
            return await _context.Comments.Where(c => c.BandId == bandId).ToListAsync();
        }

        // GET: api/Comment/Video/5
        [HttpGet("Video/{videoId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByVideo(int videoId)
        {
            return await _context.Comments.Where(c => c.VideoId == videoId).ToListAsync();
        }

        // POST: api/Comment
        [HttpPost]
        public async Task<ActionResult<Comment>> AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentsByStudent), new { studentId = comment.StudentId }, comment);
        }

        // DELETE: api/Comment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
