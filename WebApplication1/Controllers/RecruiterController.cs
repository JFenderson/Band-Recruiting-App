using AutoMapper;
using DTO.Recruiter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecruiterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RecruiterController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecruiter(int id)
        {
            var recruiter = await _context.Recruiters.FindAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RecruiterDTO>(recruiter));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecruiter([FromBody] RecruiterDTO recruiterDto)
        {
            var recruiter = _mapper.Map<Recruiter>(recruiterDto);
            recruiter.CreatedAt = DateTime.UtcNow;

            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecruiter), new { id = recruiter.RecruiterId }, _mapper.Map<RecruiterDTO>(recruiter));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruiter(int id, [FromBody] RecruiterDTO recruiterDto)
        {
            if (id != recruiterDto.RecruiterId)
            {
                return BadRequest();
            }

            var recruiter = await _context.Recruiters.FindAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }

            _mapper.Map(recruiterDto, recruiter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

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
    }
}
