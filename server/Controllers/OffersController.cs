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

        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetOffersByStudentId(string studentId)
        {
            var offers = await _offerService.GetOffersByStudentAsync(studentId);
            return Ok(offers);
        }

        [HttpGet("band/{bandId}")]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetOffersByBandId(string bandId)
        {
            var offers = await _offerService.GetOffersByStudentAsync(bandId);
            return Ok(offers);
        }

        // Get all offers for a recruiter
        [HttpGet("recruiter/{recruiterId}/offers")]
        public async Task<ActionResult<IEnumerable<OfferDTO>>> GetOffersForRecruiter(string recruiterId)
        {
            var offers = await _offerService.GetOffersByRecruiterAsync(recruiterId);
            return Ok(offers);
        }

        [HttpGet("recruiter/{recruiterId}/students")]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudentsByRecruiterOffers(string recruiterId)
        {
            var students = await _offerService.GetStudentsByRecruiterAsync(recruiterId);

            if (students == null || !students.Any())
                return NotFound();

            return Ok(students);
        }

        // Send an offer to a student
        [HttpPost("recruiter/{recruiterId}/student/{studentId}/offers")]
        public async Task<IActionResult> CreateOffer([FromBody] OfferDTO offerDto)
        {
            var createdOffer = await _offerService.CreateOfferAsync(offerDto);
            return CreatedAtAction(nameof(GetOffer), new { offerId = createdOffer.OfferId, studentId = createdOffer.StudentId }, createdOffer);
        }

        // Update the status of an offer
        [HttpPut("{offerId}/status")]
        public async Task<IActionResult> UpdateOffer(string offerId, [FromBody] OfferDTO offerDto)
        {
            var updatedOffer = await _offerService.UpdateOfferAsync(offerId, offerDto);
            return Ok(updatedOffer);
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
