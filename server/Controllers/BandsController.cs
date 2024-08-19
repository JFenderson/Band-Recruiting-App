using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Data;
using Models;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BandsController : ControllerBase
    {
        private readonly IBandService _bandService;

        public BandsController(IBandService bandService)
        {
            _bandService = bandService;
        }

        // GET: api/Bands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BandDTO>>> GetAllBands()
        {
            var bands = await _bandService.GetAllAsync();
            return Ok(bands.Select(b => new Band()));
        }

        // GET: api/Bands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BandDTO>> GetBand(int id)
        {
            var band = await _bandService.GetByIdAsync(id);
            if (band == null)
                return NotFound();

            return Ok(new BandDTO(band));
        }

        // PUT: api/Bands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBand(int id, UpdateBandDTO updateBandDto)
        {
            var band = await _bandService.GetByIdAsync(id);
            if (band == null)
                return NotFound();

            // Update band properties from updateBandDto

            await _bandService.UpdateAsync(band);

            return NoContent();
        }

        // POST: api/Bands
        [HttpPost]
        public async Task<ActionResult<BandDTO>> CreateBand(CreateBandDTO createBandDto)
        {
            var band = new Band
            {
                // Map properties from createBandDto to Band
            };

            await _bandService.AddAsync(band);

            return CreatedAtAction(nameof(GetBand), new { id = band.BandId }, new BandDTO(band));
        }

        // DELETE: api/Bands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBand(int id)
        {
            var band = await _bandService.GetByIdAsync(id);
            if (band == null)
                return NotFound();

            await _bandService.DeleteAsync(band);

            return NoContent();
        }

     
    }
}
