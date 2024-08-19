using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;

namespace server.Services
{
    public class OfferService : Service<Offer>, IOfferService
    {
        private readonly ApplicationDbContext _context;

        public OfferService(ApplicationDbContext context) : base(context) { }


        public async Task<IEnumerable<Offer>> GetOffersByBandAsync(int bandId)
        {
            return await _context.Offers
                .Where(o => o.OfferBandId == bandId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetOffersByStudentAsync(string studentId)
        {
            return await _context.Offers
                .Where(o => o.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<OfferDTO> SendOfferAsync(int bandId, string studentId, string recruiterId, string amount, OfferDTO offerDTO)
        {
            var offer = new Offer
            {
                OfferBandId = bandId,
                StudentId = studentId,
                RecruiterId = recruiterId,
                Amount = offerDTO.Amount,
                OfferDate = offerDTO.OfferDate,
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            return new OfferDTO(offer)
            {
                OfferId = offer.OfferId,
                BandId = offer.OfferBandId,
                StudentId = offer.StudentId,
                RecruiterId = offer.RecruiterId,
                Amount = offer.Amount,
                OfferDate = offer.OfferDate
            };
        }
    }
}