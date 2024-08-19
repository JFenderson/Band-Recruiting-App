using server.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;

namespace server.Services
{
    public class StudentService : Service<Student>, IStudentService
    {
        public StudentService(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Student>> GetStudentsByInstrumentAsync(string instrument)
        {
            return await _context.Users
                .OfType<Student>()
                .Where(s => s.Instrument == instrument)
                .ToListAsync();
        }

        public async Task<IEnumerable<Video>> GetStudentVideosAsync(string studentId)
        {
            return await _context.Videos
                .Where(v => v.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetStudentScholarshipOffersAsync(string studentId)
        {
            return await _context.Offers
                .Where(o => o.StudentId == studentId)
                .ToListAsync();
        }
    }
}
