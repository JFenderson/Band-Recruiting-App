using AutoMapper;
using DTO.Offer;
using Microsoft.AspNetCore.Mvc;
using Models;
using WebApplication1.Data;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfferController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OfferController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffer(int id)
        {
            var offer = await _context.Offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<OfferDTO>(offer));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOffer([FromBody] OfferDTO offerDto)
        {
            var offer = _mapper.Map<Offer>(offerDto);
            offer.CreatedAt = DateTime.UtcNow;

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOffer), new { id = offer.OfferId }, _mapper.Map<OfferDTO>(offer));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffer(int id, [FromBody] OfferDTO offerDto)
        {
            if (id != offerDto.OfferId)
            {
                return BadRequest();
            }

            var offer = await _context.Offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            _mapper.Map(offerDto, offer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {
            var offer = await _context.Offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
