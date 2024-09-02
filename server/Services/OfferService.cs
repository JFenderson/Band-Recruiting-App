using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
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

        // Get offers made by a specific band
        public async Task<IEnumerable<Offer>> GetOffersByBandAsync(int bandId)
        {
            return await _context.Offers
                .Where(o => o.OfferBandId == bandId)
                .Include(o => o.Student)
                .Include(o => o.Recruiter)
                .ToListAsync();
        }

        // Get offers received by a specific student
        public async Task<IEnumerable<Offer>> GetOffersByStudentAsync(string studentId)
        {
            return await _context.Offers
                .Where(o => o.StudentId == studentId)
                .Include(o => o.Band)
                .Include(o => o.Recruiter)
                .ToListAsync();
        }

        // Get offers sent by a recruiter
        public async Task<IEnumerable<OfferDTO>> GetOffersForRecruiter(string recruiterId)
        {
            return await _context.Offers
            .Where(o => o.RecruiterId == recruiterId)
            .Include(o => o.Student)
            .Include(o => o.Band)
            .Select(o => new OfferDTO
            {
                OfferId = o.OfferId,
                Amount = o.Amount,
                Status = o.Status.GetDisplayName(),
                OfferDate = o.OfferDate,
                StudentId = o.StudentId,
                RecruiterId = o.RecruiterId,
                BandName = o.Band.Name,
                StudentName = $"{o.Student.FirstName} {o.Student.LastName}"
            })
            .ToListAsync();
        }

        // Send an offer from a recruiter to a student
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

        // Update the status of an offer (e.g., Accepted, Rejected)
        public async Task<bool> UpdateOfferStatusAsync(int offerId, OfferStatus status)
        {
            var offer = await _context.Offers.FindAsync(offerId);
            if (offer == null) return false;

            offer.Status = status;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
