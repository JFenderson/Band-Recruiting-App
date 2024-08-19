using server.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;

namespace server.Services
{
    public class BandService : Service<Band>, IBandService
    {
        public BandService(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Student>> GetInterestedStudentsAsync(int bandId)
        {
            return await _context.Interests
                .Where(i => i.BandId == bandId)
                .Select(i => i.Student)
                .ToListAsync();
        }

        public async Task<int> GetInterestedStudentCountAsync(int bandId)
        {
            return await _context.Interests
                .CountAsync(i => i.BandId == bandId);
        }
    }
}
