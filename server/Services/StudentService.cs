using server.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Services
{
    public class StudentService : Service<Student>, IStudentService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public StudentService(ApplicationDbContext context, UserManager<User> userManager) : base(context)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<Student> CreateStudentAsync(CreateStudentDTO createStudentDTO)
        {
            // Check if the email already exists
            var existingUserByEmail = await _userManager.FindByEmailAsync(createStudentDTO.Email);
            if (existingUserByEmail != null)
            {
                throw new Exception("A user with this email already exists.");
            }

            // Check if the username already exists
            var existingUserByUsername = await _userManager.FindByNameAsync(createStudentDTO.UserName);
            if (existingUserByUsername != null)
            {
                throw new Exception("A user with this username already exists.");
            }

            // Proceed with creating the student
            var student = new Student
            {
                UserName = createStudentDTO.UserName,
                Email = createStudentDTO.Email,
                FirstName = createStudentDTO.FirstName,
                LastName = createStudentDTO.LastName,
                Phone = createStudentDTO.Phone,
                GraduationYear = createStudentDTO.GraduationYear,
                Instrument = createStudentDTO.Instrument,
                HighSchool = createStudentDTO.HighSchool,
                ProfilePicture = createStudentDTO.ProfilePicture,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(student, createStudentDTO.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Optionally, assign a role to the student
            await _userManager.AddToRoleAsync(student, "Student");

            return student;
        }

        public async Task<Student> UpdateStudentAsync(int id, UpdateStudentDTO updateStudentDTO)
        {
            var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == id.ToString());

            if (student == null)
            {
                throw new Exception("Student not found.");
            }

            student.Email = updateStudentDTO.Email;
            student.FirstName = updateStudentDTO.FirstName;
            student.LastName = updateStudentDTO.LastName;
            student.Phone = updateStudentDTO.Phone;
            student.GraduationYear = updateStudentDTO.GraduationYear;
            student.Instrument = updateStudentDTO.Instrument;
            student.HighSchool = updateStudentDTO.HighSchool;
            student.ProfilePicture = updateStudentDTO.ProfilePicture;

            _context.Users.Update(student);
            await _context.SaveChangesAsync();

            return student;
        }

        public async Task<StudentDTO> GetStudentByIdAsync(int id)
        {
            var student = await _context.Users.OfType<Student>()
                .Include(s => s.Videos)
                .Include(s => s.ScholarshipOffers)
                .FirstOrDefaultAsync(s => s.Id == id.ToString());

            if (student == null)
            {
                throw new Exception("Student not found.");
            }

            // Create StudentDTO using the constructor
            var studentDto = new StudentDTO(student);

            // Fetch additional information like overall rating and offer count
            studentDto.OverallRating = await GetStudentOverallRatingAsync(student.Id);
            studentDto.OfferCount = await GetStudentOfferCountAsync(student.Id);

            return studentDto;
        }

        public async Task<int> GetStudentOfferCountAsync(string studentId)
        {
            return await _context.Offers
                .Where(o => o.StudentId == studentId)
                .CountAsync();
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            return await _context.Users
                .OfType<Student>()
                .Include(s => s.Videos)
                .Include(s => s.ScholarshipOffers)
                .ToListAsync();
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == id.ToString());

            if (student == null)
            {
                return false;
            }

            _context.Users.Remove(student);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<IEnumerable<Student>> GetStudentsByGradYearAsync(int gradYear)
        {
            return await _context.Users
                .OfType<Student>()
                .Where(r => r.GraduationYear == gradYear)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rating>> GetStudentRatingsAsync(string studentId)
        {
            return await _context.Ratings
                .Where(r => r.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetStudentCommentsAsync(string studentId)
        {
            return await _context.Comments
                .Where(c => c.StudentId == studentId)
                .ToListAsync();
        }

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

        public async Task<decimal?> GetStudentOverallRatingAsync(string studentId)
        {
            var ratings = await _context.Ratings
                .Where(r => r.StudentId == studentId)
                .ToListAsync();

            if (ratings == null || !ratings.Any())
            {
                return null; // No ratings available
            }

            return (decimal)ratings.Average(r => r.Score);
        }

    }
}
