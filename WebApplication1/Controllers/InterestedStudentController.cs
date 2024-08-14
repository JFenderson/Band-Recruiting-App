using AutoMapper;
using DTO.InterestedStudentDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApplication1.Data;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestedStudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public InterestedStudentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateInterest(InterestedStudentDTO interestedStudentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingInterest = await _context.InterestedStudents
                .FirstOrDefaultAsync(i => i.StudentId == interestedStudentDto.StudentId && i.BandId == interestedStudentDto.BandId);

            if (existingInterest != null)
            {
                existingInterest.IsInterested = interestedStudentDto.IsInterested;
                _context.InterestedStudents.Update(existingInterest);
            }
            else
            {
                var interestedStudent = _mapper.Map<InterestedStudent>(interestedStudentDto);
                _context.InterestedStudents.Add(interestedStudent);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InterestedStudentDTO>> GetInterest(int id)
        {
            var interestedStudent = await _context.InterestedStudents
                .Include(i => i.Student)
                .Include(i => i.Band)
                .FirstOrDefaultAsync(i => i.InterestedStudentId == id);

            if (interestedStudent == null)
            {
                return NotFound();
            }

            return _mapper.Map<InterestedStudentDTO>(interestedStudent);
        }
    }

}
