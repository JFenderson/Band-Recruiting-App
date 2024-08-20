using Models;
using server.DTOs;

namespace server.Services
{
    public interface IRatingService : IService<RatingDTO>
    {
        Task<Rating> AddRatingAsync(string studentId, string recruiterId, int score);
        Task<IEnumerable<Rating>> GetRatingsByStudentIdAsync(string studentId);
        Task<double> GetAverageRatingForStudentAsync(string studentId);
        Task<bool> RateStudentAsync(string recruiterId, string studentId, RatingDTO ratingDTO);
    }
}
