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

        public async Task<Rating> AddOrUpdateRatingAsync(string studentId, string recruiterId, int score)
        {
            // Check if this recruiter has already rated this student
            var existingRating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.StudentId == studentId && r.RecruiterId == recruiterId);
            var newRating = new Rating();

            if (existingRating != null)
            {
                existingRating.Score = score;  // Update existing rating
                _context.Ratings.Update(existingRating);


            }
            else
            {


                newRating.RatingId = Guid.NewGuid().ToString();
                newRating.StudentId = studentId;
                newRating.RecruiterId = recruiterId;
                newRating.Score = score;
                

                _context.Ratings.Add(newRating);
            }

            await _context.SaveChangesAsync();

            // Recalculate the student's average rating
            await UpdateStudentAverageRatingAsync(studentId);

            return existingRating ?? newRating;
        }

        private async Task UpdateStudentAverageRatingAsync(string studentId)
        {

            var ratings = await _context.Ratings
                .Where(r => r.StudentId == studentId)
                .ToListAsync();

            if (ratings.Any())
            {
                int averageRating = (int)ratings.Average(r => r.Score);
                //var student = await _context.Students.FindAsync(studentId);
                var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == studentId.ToString());

                if (student != null)
                {
                    student.AverageRating = averageRating;
                    _context.Users.Update(student);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
