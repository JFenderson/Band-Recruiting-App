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


        public StudentController(IStudentService studentRepository, IVideoService videoService)
        {
            _studentService = studentRepository;
            _videoService = videoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetAllStudents()
        {
            var students = await _studentService.GetAllAsync();
            return Ok(students.Select(s => new StudentDTO(s)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudent(int id)
        {
            var student = await _studentService.GetByIdAsync(id);
            if (student == null)
                return NotFound();

            var studentDto = new StudentDTO(student)
            {
                StudentId = student.Id,
                //UserName = student.UserName,
                Email = student.Email,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Instrument = student.Instrument,
                HighSchool = student.HighSchool,
                GraduationYear = student.GraduationYear
            };

            return Ok(new StudentDTO(student));
        }

        [HttpPost]
        public async Task<ActionResult<StudentDTO>> CreateStudent(CreateStudentDTO createStudentDTO)
        {
            var student = new Student
            {
                // Map properties from createStudentDTO to Student
            
                UserName = createStudentDTO.UserName,
                Email = createStudentDTO.Email,
                FirstName = createStudentDTO.FirstName,
                LastName = createStudentDTO.LastName,
                Instrument = createStudentDTO.Instrument,
                HighSchool = createStudentDTO.HighSchool,
                GraduationYear = createStudentDTO.GraduationYear
            
            };

            await _studentService.AddAsync(student);

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, new StudentDTO(student));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDTO updateStudentDTO)
        {
            var student = await _studentService.GetByIdAsync(id);
            if (student == null)
                return NotFound();

            // Update student properties from updateStudentDTO

            await _studentService.UpdateAsync(student);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _studentService.GetByIdAsync(id);
            if (student == null)
                return NotFound();

            await _studentService.DeleteAsync(student);

            return NoContent();
        }

        [HttpGet("{id}/videos")]
        public async Task<ActionResult<IEnumerable<VideoDTO>>> GetStudentVideos(string id)
        {
            var videos = await _studentService.GetStudentVideosAsync(id);
            return Ok(videos.Select(v => new VideoDTO(v)));
        }

        [HttpGet("{id}/scholarshipoffers")]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetStudentScholarshipOffers(string id)
        {
            var offers = await _studentService.GetStudentScholarshipOffersAsync(id);
            return Ok(offers.Select(o => new OfferDTO(o)));
        }
    }
}
