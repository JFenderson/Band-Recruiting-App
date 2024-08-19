using Models;
using server.DTOs;

namespace server.Services
{
    public interface IOfferService : IService<Offer>
    {

        Task<OfferDTO> SendOfferAsync(int bandId, string studentId, string recruiterId, string amount, OfferDTO offerDTO);
        Task<IEnumerable<Offer>> GetOffersByBandAsync(int bandId);
        Task<IEnumerable<Offer>> GetOffersByStudentAsync(string studentId);
    }
}
