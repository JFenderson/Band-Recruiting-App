using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Services
{
    public class RecruiterService : Service<Recruiter>, IRecruiterService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public RecruiterService(ApplicationDbContext context, UserManager<User> userManager) : base(context) 
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<Recruiter>> GetRecruitersByBandAsync(int bandId)
        {
            return await _context.Users
                .OfType<Recruiter>()
                .Where(r => r.BandId == bandId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rating>> GetRecruiterRatingsAsync(string recruiterId)
        {
            return await _context.Ratings
                .Where(r => r.RecruiterId == recruiterId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetRecruiterCommentsAsync(string recruiterId)
        {
            return await _context.Comments
                .Where(c => c.RecruiterId == recruiterId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Recruiter>> GetRecruitersAsync()
        {
            return await _context.Users
                .OfType<Recruiter>()
                .Select(r => new Recruiter
                {
                    FirstName = r.FirstName,
                    LastName = r.LastName,  
                    Email = r.Email,
                    Id = r.Id
                })
                .ToListAsync();
        }

        public async Task<Recruiter> GetRecruiterByIdAsync(string recruiterId)
        {
            var recruiter = await _context.Users
                .OfType<Recruiter>()
                .FirstOrDefaultAsync(r => r.Id == recruiterId);

            if (recruiter == null) return null;

            return new Recruiter
            {
                FirstName = recruiter.FirstName,
                LastName = recruiter.LastName,
                Email = recruiter.Email,
                Id = recruiter.Id
            };
        }

        public async Task<Recruiter> CreateRecruiterAsync(RecruiterDTO recruiterDTO)
        {
            var recruiter = new Recruiter
            {
                UserName = recruiterDTO.UserName,
                Email = recruiterDTO.Email, // Ensure this is set
                FirstName = recruiterDTO.FirstName,
                LastName = recruiterDTO.LastName,
                Phone = recruiterDTO.Phone,
                ProfilePicture = recruiterDTO.ProfilePicture,
                BandId = recruiterDTO.BandId,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(recruiter, recruiterDTO.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return recruiter;
        }

        public async Task<bool> UpdateRecruiterAsync(string recruiterId, Recruiter recruiterDTO)
        {
            var recruiter = await _context.Users.OfType<Recruiter>().FirstOrDefaultAsync(r => r.Id == recruiterId);

            if (recruiter == null) return false;

            recruiter.FirstName = recruiterDTO.FirstName;
            recruiter.LastName = recruiterDTO.LastName;
            recruiter.Email = recruiterDTO.Email;
            recruiter.Id = recruiterDTO.Id;

            _context.Users.Update(recruiter);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteRecruiterAsync(string recruiterId)
        {
            var recruiter = await _context.Users.OfType<Recruiter>().FirstOrDefaultAsync(r => r.Id == recruiterId);

            if (recruiter == null) return false;

            _context.Users.Remove(recruiter);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
