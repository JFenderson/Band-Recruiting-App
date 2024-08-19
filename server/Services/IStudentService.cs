using server.DTOs;
using Models;

namespace server.Services
{
    public interface IStudentService : IService<Student>
    {
        //Task<Student> GetStudentByIdAsync(int studentId);
        // Other methods as needed for student-related logic
        Task<IEnumerable<Student>> GetStudentsByInstrumentAsync(string instrument);
        Task<IEnumerable<Video>> GetStudentVideosAsync(string studentId);
        Task<IEnumerable<Offer>> GetStudentScholarshipOffersAsync(string studentId);
    }
}
