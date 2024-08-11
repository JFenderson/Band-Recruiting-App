using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Student
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.Include(s => s.Videos).ToListAsync();
        }

        // GET: api/Student/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students
                                        .Include(s => s.Videos)
                                        .FirstOrDefaultAsync(s => s.StudentId == id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // POST: api/Student
        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
        }

        // PUT: api/Student/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // DELETE: api/Student/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Student/5/UploadVideo
        [HttpPost("{id}/UploadVideo")]
        public async Task<ActionResult<Video>> UploadVideo(int id, [FromBody] Video video)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            video.StudentId = id;
            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, video);
        }

        // Helper method to check if student exists
        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.StudentId == id);
        }
    }
}
