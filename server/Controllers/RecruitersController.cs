using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using server.Models;
using server.Services;
using Models;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecruiterController : ControllerBase
    {
        private readonly IRecruiterService _recruiterService;
        private readonly IStudentService _studentService;
        private readonly IRatingService _ratingService;
        private readonly ICommentService _commentService;

        public RecruiterController(
            IRecruiterService recruiterService,
            IStudentService studentService,
            IRatingService ratingService,
            ICommentService commentService)
        {
            _recruiterService = recruiterService;
            _studentService = studentService;
            _ratingService = ratingService;
            _commentService = commentService;
        }

        // GET: api/recruiter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecruiterDTO>>> GetRecruiters()
        {
            var recruiters = await _recruiterService.GetRecruitersAsync();
            return Ok(recruiters.Select(r => new RecruiterDTO(r)));
        }

        // GET: api/recruiter/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RecruiterDTO>> GetRecruiterById(string id)
        {
            var recruiter = await _recruiterService.GetRecruiterByIdAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }
            return Ok(new RecruiterDTO(recruiter));
        }

        // POST: api/recruiter
        [HttpPost]
        public async Task<ActionResult<RecruiterDTO>> CreateRecruiter(CreateRecruiterDTO createRecruiterDto)
        {
            var recruiter = new Recruiter
            {
                // Map properties from createRecruiterDto to Recruiter
            };

            await _recruiterService.AddAsync(recruiter);

            return CreatedAtAction(nameof(GetRecruiters), new { id = recruiter.Id }, new RecruiterDTO(recruiter));
        }

        // PUT: api/recruiter/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruiter(int id, UpdateRecruiterDTO updateRecruiterDto)
        {
            var recruiter = await _recruiterService.GetByIdAsync(id);
            if (recruiter == null)
                return NotFound();

            // Update recruiter properties from updateRecruiterDto

            await _recruiterService.UpdateAsync(recruiter);

            return NoContent();
        }

        // DELETE: api/recruiter/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruiter(string id)
        {
            var recruiter = await _recruiterService.GetRecruiterByIdAsync(id);
            if (recruiter == null)
                return NotFound();

            await _recruiterService.DeleteRecruiterAsync(id);

            return NoContent();
        }

        // POST: api/recruiter/{recruiterId}/rate/{studentId}
        [HttpPost("{recruiterId}/rate/{studentId}")]
        public async Task<IActionResult> RateStudent(string recruiterId, string studentId, [FromBody] RatingDTO ratingDTO)
        {
            //var student = await _studentService.GetStudentByIdAsync(studentId);
            //if (student == null)
            //{
            //    return NotFound("Student not found.");
            //}

            var result = await _ratingService.RateStudentAsync(recruiterId, studentId, ratingDTO);
            if (!result)
            {
                return BadRequest("Rating failed.");
            }

            return Ok("Rating submitted successfully.");
        }

        // POST: api/recruiter/{recruiterId}/comment/{studentId}
        [HttpPost("{recruiterId}/comment/{studentId}")]
        public async Task<IActionResult> CommentOnStudent(string recruiterId, string studentId, [FromBody] CommentDTO commentDTO)
        {
            //var student = await _studentService.GetStudentByIdAsync(studentId);
            //if (student == null)
            //{
            //    return NotFound("Student not found.");
            //}

            var result = await _commentService.CommentOnStudentAsync(recruiterId, studentId, commentDTO);
            if (!result)
            {
                return BadRequest("Comment failed.");
            }

            return Ok("Comment submitted successfully.");
        }

        [HttpGet("{id}/ratings")]
        public async Task<ActionResult<IEnumerable<RatingDTO>>> GetRecruiterRatings(string id)
        {
            var ratings = await _recruiterService.GetRecruiterRatingsAsync(id);
            return Ok(ratings.Select(r => new RatingDTO(r)));
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetRecruiterComments(string id)
        {
            var comments = await _recruiterService.GetRecruiterCommentsAsync(id);
            return Ok(comments.Select(c => new CommentDTO(c)));
        }
    }
}