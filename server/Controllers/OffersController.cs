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
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _offerService;

        public OfferController(IOfferService offerService)
        {
            _offerService = offerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetAllOffers()
        {
            var offers = await _offerService.GetAllAsync();
            return Ok(offers.Select(o => new Offer()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OfferDTO>> GetOffer(int id)
        {
            var offer = await _offerService.GetByIdAsync(id);
            if (offer == null)
                return NotFound();

            return Ok(new Offer());
        }

        // Get all offers for a recruiter
        [HttpGet("recruiter/{recruiterId}/offers")]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetOffersForRecruiter(string recruiterId)
        {
            var offers = await _offerService.GetOffersForRecruiter(recruiterId);
            return Ok(offers);
        }

        // Send an offer to a student
        [HttpPost("recruiter/{recruiterId}/offers")]
        public async Task<ActionResult<OfferDTO>> SendOffer(string recruiterId, [FromBody] CreateOfferDTO createOfferDTO)
        {
            var offer = await _offerService.SendOfferAsync(createOfferDTO.StudentId, recruiterId, createOfferDTO.BandId, createOfferDTO.Amount);

            return CreatedAtAction(nameof(GetOffersForRecruiter), new { recruiterId = recruiterId });
        }

        // Update the status of an offer
        [HttpPut("offers/{offerId}/status")]
        public async Task<IActionResult> UpdateOfferStatus(int offerId, [FromBody] UpdateOfferStatusDTO updateStatusDTO)
        {
            var success = await _offerService.UpdateOfferStatusAsync(offerId, updateStatusDTO.Status);
            if (!success)
            {
                return NotFound(new { Message = "Offer not found." });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {
            var offer = await _offerService.GetByIdAsync(id);
            if (offer == null)
                return NotFound();

            await _offerService.DeleteAsync(offer);

            return NoContent();
        }
    }
}
