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
        private readonly IOfferService _offerService;

        public RecruiterController(
            IRecruiterService recruiterService,
            IStudentService studentService,
            IOfferService offerService,
            IRatingService ratingService,
            ICommentService commentService)
        {
            _recruiterService = recruiterService;
            _studentService = studentService;
            _ratingService = ratingService;
            _offerService = offerService;
            _commentService = commentService;
        }

        #region Recruiter
        // GET: api/recruiter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecruiterDTO>>> GetRecruiters()
        {
            var recruiters = await _recruiterService.GetRecruitersAsync();
            return Ok(recruiters);
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
            return Ok(new RecruiterDTO());
        }

        // POST: api/recruiter
        [HttpPost]
        public async Task<ActionResult> CreateRecruiter([FromBody] CreateRecruiterDTO recruiterDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var recruiter = await _recruiterService.CreateRecruiterAsync(recruiterDto);
                return Ok(recruiter);
            }
            catch (Exception ex)
            {
                // Return the detailed error message to diagnose the issue
                var innerException = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(new { Error = ex.Message });
            }
        }

        // PUT: api/recruiter/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruiter(string id, UpdateRecruiterDTO updateRecruiterDTO)
        {
            var recruiter = await _recruiterService.GetRecruiterByIdAsync(id);
            if (recruiter == null)
                return NotFound();

            // Update recruiter properties from updateRecruiterDTO

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
        #endregion

        #region Comment
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

        // POST: api/recruiter/comment
        [HttpPost("comment")]
        public async Task<ActionResult<Comment>> AddComment([FromBody] CommentDTO commentDTO)
        {
            var comment = await _commentService.CommentOnVideoAsync(commentDTO.VideoId, commentDTO.RecruiterId, commentDTO.Content);
            return Ok(comment);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetRecruiterComments(string id)
        {
            var comments = await _recruiterService.GetRecruiterCommentsAsync(id);
            return Ok(comments.Select(c => new CommentDTO(c)));
        }
        #endregion

        #region Rating
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

        [HttpGet("{id}/ratings")]
        public async Task<ActionResult<IEnumerable<RatingDTO>>> GetRecruiterRatings(string id)
        {
            var ratings = await _recruiterService.GetRecruiterRatingsAsync(id);
            return Ok(ratings.Select(r => new RatingDTO(r)));
        }

        // GET: api/recruiter/ratings/student/{studentId}
        [HttpGet("ratings/student/{studentId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatings(string studentId)
        {
            var ratings = await _ratingService.GetRatingsByStudentIdAsync(studentId);
            return Ok(ratings);
        }

        // GET: api/recruiter/ratings/student/{studentId}/average
        [HttpGet("ratings/student/{studentId}/average")]
        public async Task<ActionResult<double>> GetAverageRating(string studentId)
        {
            var averageRating = await _ratingService.GetAverageRatingForStudentAsync(studentId);
            return Ok(averageRating);
        }
        #endregion

        #region Offer
        // POST: api/recruiter/offer
        [HttpPost("offer")]
        public async Task<ActionResult<Offer>> SendOffer([FromBody] OfferDTO offerDTO)
        {
            var offer = await _offerService.SendOfferAsync(offerDTO.StudentId, offerDTO.RecruiterId,offerDTO.OfferBandId, offerDTO.Amount);
            return Ok(offer);
        }

        // PUT: api/recruiter/offer/{offerId}/status
        [HttpPut("offer/{offerId}/status")]
        public async Task<IActionResult> UpdateOfferStatus(int offerId, [FromBody] OfferStatusDTO statusDTO)
        {
            var success = await _offerService.UpdateOfferStatusAsync(offerId, statusDTO.Status);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }


        #endregion


    }
}