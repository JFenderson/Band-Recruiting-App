using Models;
using server.Data;
using server.DTOs;

namespace server.Services
{
    public class RatingService :Service<RatingDTO>, IRatingService
    {
        private readonly ApplicationDbContext _context;

        public RatingService(ApplicationDbContext context) : base(context) { }
      

        public async Task<bool> RateStudentAsync(string recruiterId, string studentId, RatingDTO ratingDTO)
        {
            var rating = new Rating
            {
                RecruiterId = recruiterId,
                StudentId = studentId,
                Score = ratingDTO.Score,
            };

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
