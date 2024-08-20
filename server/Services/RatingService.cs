using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;

namespace server.Services
{
    public class RatingService : Service<RatingDTO>, IRatingService
    {
        private readonly ApplicationDbContext _context;

        public RatingService(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }


        public async Task<Rating> AddRatingAsync(string studentId, string recruiterId, int score)
        {
            var rating = new Rating
            {
                StudentId = studentId,
                RecruiterId = recruiterId,
                Score = score,
                RatingDate = DateTime.UtcNow
            };

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return rating;
        }

        public async Task<IEnumerable<Rating>> GetRatingsByStudentIdAsync(string studentId)
        {
            return await _context.Ratings
                .Where(r => r.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<double> GetAverageRatingForStudentAsync(string studentId)
        {
            var ratings = await _context.Ratings
                .Where(r => r.StudentId == studentId)
                .ToListAsync();

            if (ratings.Any())
            {
                return ratings.Average(r => r.Score);
            }

            return 0.0;
        }

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
