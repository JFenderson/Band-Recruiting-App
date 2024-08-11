using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruiterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecruiterController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Recruiter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recruiter>>> GetRecruiters()
        {
            return await _context.Recruiters.Include(r => r.Band).ToListAsync();
        }

        // GET: api/Recruiter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recruiter>> GetRecruiter(int id)
        {
            var recruiter = await _context.Recruiters
                                          .Include(r => r.Band)
                                          .FirstOrDefaultAsync(r => r.RecruiterId == id);

            if (recruiter == null)
            {
                return NotFound();
            }

            return recruiter;
        }

        // POST: api/Recruiter
        [HttpPost]
        public async Task<ActionResult<Recruiter>> CreateRecruiter(Recruiter recruiter)
        {
            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecruiter), new { id = recruiter.RecruiterId }, recruiter);
        }

        // PUT: api/Recruiter/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruiter(int id, Recruiter recruiter)
        {
            if (id != recruiter.RecruiterId)
            {
                return BadRequest();
            }

            _context.Entry(recruiter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecruiterExists(id))
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

        // DELETE: api/Recruiter/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruiter(int id)
        {
            var recruiter = await _context.Recruiters.FindAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }

            _context.Recruiters.Remove(recruiter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if recruiter exists
        private bool RecruiterExists(int id)
        {
            return _context.Recruiters.Any(e => e.RecruiterId == id);
        }
    }
}
