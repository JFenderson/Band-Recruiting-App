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

        [HttpPost]
        public async Task<ActionResult<OfferDTO>> CreateOffer(CreateOfferDTO createOfferDTO)
        {
            var offer = new Offer
            {
                // Map properties from createOfferDTO to Offer
                Amount = createOfferDTO.Amount,
                OfferDate = createOfferDTO.OfferDate,
                RecruiterId = createOfferDTO.RecruiterId,
                StudentId = createOfferDTO.StudentId,
                OfferBandId = createOfferDTO.BandId
            };

            await _offerService.AddAsync(offer);

            return CreatedAtAction(nameof(GetOffer), new { id = offer.OfferId }, new OfferDTO(offer));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffer(int id, UpdateOfferDTO updateOfferDTO)
        {
            var offer = await _offerService.GetByIdAsync(id);
            if (offer == null)
                return NotFound();

            // Update offer properties from updateOfferDTO

            await _offerService.UpdateAsync(offer);

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
