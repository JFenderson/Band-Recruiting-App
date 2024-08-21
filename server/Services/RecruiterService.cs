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

        public async Task<Recruiter> CreateRecruiterAsync(CreateRecruiterDTO createRecruiterDTO)
        {
            //{
            //    "userName": "Juke1",
            //      "email": "user@subr.com",
            //      "password": "Password@123",
            //      "firstName": "Human",
            //      "lastName": "Jukebox",
            //      "bandId": 2,
            //      "phone": "222-222-2222"
            //    }

            // Check if the email already exists
            var existingUserByEmail = await _userManager.FindByEmailAsync(createRecruiterDTO.Email);
            if (existingUserByEmail != null)
            {
                throw new Exception("A user with this email already exists.");
            }

            // Check if the username already exists
            var existingUserByUsername = await _userManager.FindByNameAsync(createRecruiterDTO.UserName);
            if (existingUserByUsername != null)
            {
                throw new Exception("A user with this username already exists.");
            }

            var recruiter = new Recruiter
            {
                UserName = createRecruiterDTO.UserName,
                Email = createRecruiterDTO.Email,
                FirstName = createRecruiterDTO.FirstName,
                LastName = createRecruiterDTO.LastName,
                BandId = createRecruiterDTO.BandId,
                Phone = createRecruiterDTO.Phone,
                ProfilePicture = createRecruiterDTO.Phone,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(recruiter, createRecruiterDTO.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Optionally, assign a role to the recruiter
            await _userManager.AddToRoleAsync(recruiter, "Recruiter");
            return recruiter;
        }

        public async Task<bool> UpdateRecruiterAsync(string recruiterId, UpdateRecruiterDTO recruiterDTO)
        {
            var recruiter = await _context.Users.OfType<Recruiter>().FirstOrDefaultAsync(r => r.Id == recruiterId);

            if (recruiter == null) return false;

            recruiter.FirstName = recruiterDTO.FirstName;
            recruiter.LastName = recruiterDTO.LastName;
            recruiter.Email = recruiterDTO.Email;
            

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
