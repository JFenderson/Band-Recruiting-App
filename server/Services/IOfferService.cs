using Models;
using server.DTOs;

namespace server.Services
{
    public interface IOfferService : IService<Offer>
    {
        Task<bool> UpdateOfferStatusAsync(int offerId, OfferStatus status);
        Task<Offer> SendOfferAsync(string studentId, string recruiterId, int bandId, decimal amount);
        Task<IEnumerable<Offer>> GetOffersByBandAsync(int bandId);
        Task<IEnumerable<Offer>> GetOffersByStudentAsync(string studentId);
    }
}
