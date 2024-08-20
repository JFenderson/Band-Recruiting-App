using server.DTOs;
using Models;

namespace server.Services
{
    public interface IBandService : IService<Band>
    {
        Task<IEnumerable<Band>> GetBandsAsync();
        Task<Band> GetBandByIdAsync(int id);
        Task<Band> CreateBandAsync(Band band);
        Task<bool> UpdateBandAsync(Band band);
        Task<bool> DeleteBandAsync(int id);
        Task<IEnumerable<Student>> GetInterestedStudentsAsync(int bandId);
        Task<int> GetInterestedStudentCountAsync(int bandId);
    }
}
