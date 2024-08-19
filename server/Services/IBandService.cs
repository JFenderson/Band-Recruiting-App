using server.DTOs;
using Models;

namespace server.Services
{
    public interface IBandService : IService<Band>
    {
        Task<IEnumerable<Student>> GetInterestedStudentsAsync(int bandId);
        Task<int> GetInterestedStudentCountAsync(int bandId);
    }
}
