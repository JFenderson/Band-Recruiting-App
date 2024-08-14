using AutoMapper;
using DTO.Band;
using DTO.Student;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BandController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BandController(ApplicationDbContext context,  IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Band
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Band>>> GetBands()
        {
            return await _context.Bands.ToListAsync();
        }

        // GET: api/Band/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Band>> GetBand(int id)
        {
            var band = await _context.Bands
                                     .FirstOrDefaultAsync(b => b.BandId == id);

            if (band == null)
            {
                return NotFound();
            }

            return band;
        }

        // POST: api/Band
        [HttpPost]
        public async Task<IActionResult> CreateBand(BandDTO bandDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var band = _mapper.Map<Band>(bandDto);
            _context.Bands.Add(band);
            await _context.SaveChangesAsync();

            var bandResponseDto = _mapper.Map<BandDTO>(band);

            return CreatedAtAction(nameof(GetBand), new { id = band.BandId }, band);
        }

        // PUT: api/Band/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBand(int id, Band band)
        {
            if (id != band.BandId)
            {
                return BadRequest();
            }

            _context.Entry(band).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(id))
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

        // DELETE: api/Band/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBand(int id)
        {
            var band = await _context.Bands.FindAsync(id);
            if (band == null)
            {
                return NotFound();
            }

            _context.Bands.Remove(band);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Band/5/AddRecruiter
        [HttpPost("{id}/AddRecruiter")]
        public async Task<ActionResult<Recruiter>> AddRecruiterToBand(int id, [FromBody] Recruiter recruiter)
        {
            var band = await _context.Bands.FindAsync(id);
            if (band == null)
            {
                return NotFound();
            }

            recruiter.RecruiterId = id;
            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBand), new { id = band.BandId }, recruiter);
        }

        // GET: api/Band/5/Recruiters
        [HttpGet("{id}/Recruiters")]
        public async Task<ActionResult<IEnumerable<Recruiter>>> GetBandRecruiters(int id)
        {
            var band = await _context.Bands
                                     .Include(b => b.Recruiters)
                                     .FirstOrDefaultAsync(b => b.BandId == id);

            if (band == null)
            {
                return NotFound();
            }

            return band.Recruiters.ToList();
        }

        // Helper method to check if a band exists
        private bool BandExists(int id)
        {
            return _context.Bands.Any(e => e.BandId == id);
        }
    }
}
