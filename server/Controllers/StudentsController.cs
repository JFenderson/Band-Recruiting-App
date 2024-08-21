using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;
using server.Services;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IVideoService _videoService;


        public StudentController(IStudentService studentService, IVideoService videoService)
        {
            _studentService = studentService;
            _videoService = videoService;
        }

        // GET: api/Student
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            var students = await _studentService.GetAllStudentsAsync();
            return Ok(students);
        }

        // GET: api/Student/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudentById(int id)
        {
            try
            {
                var student = await _studentService.GetStudentByIdAsync(id);
                return Ok(student);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        // POST: api/Student
        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent([FromBody] CreateStudentDTO createStudentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var student = await _studentService.CreateStudentAsync(createStudentDTO);
                return CreatedAtAction(nameof(GetStudentById), new { id = student.Id }, student);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        // PUT: api/Student/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> UpdateStudent(int id, [FromBody] UpdateStudentDTO updateStudentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedStudent = await _studentService.UpdateStudentAsync(id, updateStudentDTO);
                return Ok(updatedStudent);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        // DELETE: api/Student/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            var result = await _studentService.DeleteStudentAsync(id);
            if (!result)
            {
                return NotFound(new { Message = "Student not found." });
            }
            return NoContent();
        }

        // GET: api/Student/gradYear/2024
        [HttpGet("gradYear/{gradYear}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByGradYear(int gradYear)
        {
            var students = await _studentService.GetStudentsByGradYearAsync(gradYear);
            return Ok(students);
        }

        // GET: api/Student/instrument/Trumpet
        [HttpGet("instrument/{instrument}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByInstrument(string instrument)
        {
            var students = await _studentService.GetStudentsByInstrumentAsync(instrument);
            return Ok(students);
        }

        // GET: api/Student/5/videos
        [HttpGet("{id}/videos")]
        public async Task<ActionResult<IEnumerable<Video>>> GetStudentVideos(int id)
        {
            var videos = await _studentService.GetStudentVideosAsync(id.ToString());
            return Ok(videos);
        }

        // GET: api/Student/5/ratings
        [HttpGet("{id}/ratings")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetStudentRatings(int id)
        {
            var ratings = await _studentService.GetStudentRatingsAsync(id.ToString());
            return Ok(ratings);
        }

        // GET: api/Student/5/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetStudentComments(int id)
        {
            var comments = await _studentService.GetStudentCommentsAsync(id.ToString());
            return Ok(comments);
        }

        // GET: api/Student/5/offers
        [HttpGet("{id}/offers")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetStudentScholarshipOffers(int id)
        {
            var offers = await _studentService.GetStudentScholarshipOffersAsync(id.ToString());
            return Ok(offers);
        }
    }
}
