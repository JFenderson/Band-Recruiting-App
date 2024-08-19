using server.DTOs;

namespace server.Services
{
    public interface IRatingService : IService<RatingDTO>
    {
        Task<bool> RateStudentAsync(string recruiterId, string studentId, RatingDTO ratingDTO);
    }
}
