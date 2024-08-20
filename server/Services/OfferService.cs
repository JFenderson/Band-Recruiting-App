using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;

namespace server.Services
{
    public class OfferService : Service<Offer>, IOfferService
    {
        private readonly ApplicationDbContext _context;

        public OfferService(ApplicationDbContext context) : base(context) 
        {
            _context = context;
        }


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

        public async Task<Offer> SendOfferAsync(string studentId, string recruiterId, int bandId, decimal amount)
        {
            var offer = new Offer
            {
                StudentId = studentId,
                RecruiterId = recruiterId,
                OfferBandId = bandId,
                Amount = amount,
                Status = OfferStatus.Pending, // Initialize the status as Pending
                OfferDate = DateTime.UtcNow
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            return offer;
        }

        public async Task<bool> UpdateOfferStatusAsync(int offerId, OfferStatus status)
        {
            var offer = await _context.Offers.FindAsync(offerId);
            if (offer == null) return false;

            offer.Status = status;
            return await _context.SaveChangesAsync() > 0;
        }

    }
}