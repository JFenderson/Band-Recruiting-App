using Bogus;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.Models;
using System.Security.Cryptography;

namespace server.Helpers
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<User> userManager)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Define roles
            string[] roleNames = { "Admin", "Recruiter", "Student" };
            IdentityResult roleResult;

            // Create roles if they don't exist
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            await CreateStudents(userManager, 10);
            await CreateRecruiters(userManager, 10, context);
            await CreateOffers(context, 20);

            //// Create test students
            //var student1 = new Student
            //{
            //    UserName = "student1",
            //    Email = "student1@example.com",
            //    UserType = "Student",
            //    RefreshToken = GenerateRefreshToken(),
            //    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
            //    FirstName = "John",
            //    LastName = "Doe",
            //    Phone = "123-456-7890",
            //    GraduationYear = 2023,
            //    Instrument = "Piano",
            //    HighSchool = "West High School",
            //    ProfilePicture = null, // Set to a URL or path if you have a default profile picture
            //    CreatedAt = DateTime.UtcNow
            //};

            //var student2 = new Student
            //{
            //    UserName = "student2",
            //    Email = "student2@example.com",
            //    UserType = "Student",
            //    RefreshToken = GenerateRefreshToken(),
            //    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
            //    FirstName = "Jane",
            //    LastName = "Smith",
            //    Phone = "098-765-4321",
            //    GraduationYear = 2024,
            //    Instrument = "Guitar",
            //    HighSchool = "East High School",
            //    ProfilePicture = null, // Set to a URL or path if you have a default profile picture
            //    CreatedAt = DateTime.UtcNow
            //};

            //// Create test recruiters
            //var recruiter1 = new Recruiter
            //{
            //    UserName = "recruiter1",
            //    Email = "recruiter1@example.com",
            //    UserType = "Recruiter",
            //    RefreshToken = GenerateRefreshToken(),
            //    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
            //    FirstName = "Alice",
            //    LastName = "Johnson",
            //    Phone = "555-555-5555",
            //    BandId = "1A2225EE-A6E2-45A5-A031-F784333D4B0C", // Assuming BandId 1 exists
            //    ProfilePicture = null, // Set to a URL or path if you have a default profile picture
            //    CreatedAt = DateTime.UtcNow
            //};

            //var recruiter2 = new Recruiter
            //{
            //    UserName = "recruiter2",
            //    Email = "recruiter2@example.com",
            //    UserType = "Recruiter",
            //    RefreshToken = GenerateRefreshToken(),
            //    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
            //    FirstName = "Bob",
            //    LastName = "Williams",
            //    Phone = "444-444-4444",
            //    BandId = "094309BC-21E5-4FB4-8F7A-D4E6DA7422EC", // Assuming BandId 2 exists
            //    ProfilePicture = null, // Set to a URL or path if you have a default profile picture
            //    CreatedAt = DateTime.UtcNow
            //};

            //// Create users and assign roles
            //await CreateUserIfNotExists(userManager, student1, "Password@123", "Student");
            //await CreateUserIfNotExists(userManager, student2, "Password@123", "Student");
            //await CreateUserIfNotExists(userManager, recruiter1, "Password@123", "Recruiter");
            //await CreateUserIfNotExists(userManager, recruiter2, "Password@123", "Recruiter");

            //// Optionally, create an admin user
            //var adminUser = new User
            //{
            //    UserName = "admin",
            //    Email = "admin@example.com",
            //    UserType = "Admin",
            //    RefreshToken = GenerateRefreshToken(),
            //    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            //};

            //await CreateUserIfNotExists(userManager, adminUser, "Admin@123", "Admin");
        }

        private static async Task CreateStudents(UserManager<User> userManager, int numStudents)
        {
            var faker = new Faker();
            var rndNum = new Random();

            for (int i = 0; i < numStudents; i++)
            {
                var student = new Student
                {
                    UserName = faker.Internet.UserName($"StudentNum{i}"),
                    Email = faker.Internet.Email(),
                    FirstName = faker.Person.FirstName,
                    LastName = faker.Person.LastName,
                    PhoneNumber = faker.Phone.PhoneNumber(),
                    Instrument = "Trombone",
                    HighSchool = GenerateHighSchoolName(faker),
                    GraduationYear = faker.Date.Future().Year,
                    CreatedAt = DateTime.UtcNow,
                    AverageRating = rndNum.Next(1,5),
                    RefreshToken = GenerateRefreshToken(),
                    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
                };

                var result = await userManager.CreateAsync(student, "Password123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(student, "Student");
                    Console.WriteLine($"Created student: {student.UserName}");
                }
                else
                {
                    Console.WriteLine($"Failed to create student: {string.Join(", ", result.Errors)}");
                }
            }
        }

        private static async Task CreateRecruiters(UserManager<User> userManager, int numRecruiters, ApplicationDbContext context)
        {
            var faker = new Faker();
            var bandIds = await context.Bands.Select(b => b.BandId).ToListAsync();
            if (bandIds.Count == 0)
            {
                Console.WriteLine("No bands found in the database. Please seed bands before creating recruiters.");
                return;
            }

            for (int i = 0; i < numRecruiters; i++)
            {
                var randomBandId = faker.PickRandom(bandIds);

                var recruiter = new Recruiter
                {
                    UserName = faker.Internet.UserName($"recruiterNum{i}"),
                    Email = faker.Internet.Email(),
                    FirstName = faker.Person.FirstName,
                    LastName = faker.Person.LastName,
                    PhoneNumber = faker.Phone.PhoneNumber(),
                    BandId = randomBandId,
                    CreatedAt = DateTime.UtcNow,
                    RefreshToken = GenerateRefreshToken(),
                    RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
                };

                var result = await userManager.CreateAsync(recruiter, "Password123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(recruiter, "Recruiter");
                    Console.WriteLine($"Created recruiter: {recruiter.UserName}, assigned to BandId: {recruiter.BandId}");
                }
                else
                {
                    Console.WriteLine($"Failed to create recruiter: {string.Join(", ", result.Errors)}");
                }
            }
        }

        private static async Task CreateOffers(ApplicationDbContext context, int numOffers)
        {
            var faker = new Faker();

            // Fetch all existing StudentId and RecruiterId from the database
            var studentIds = await context.Users.OfType<Student>().Select(s => s.Id).ToListAsync();
            var recruiters = await context.Users
                                           .OfType<Recruiter>()
                                           .Include(r => r.Band) // Assuming a Recruiter has a Band navigation property
                                           .Select(r => new
                                           {
                                               RecruiterId = r.Id,
                                               BandId = r.Band.BandId,
                                               BandName = r.Band.Name
                                           })
                                           .ToListAsync();

            if (!studentIds.Any() || !recruiters.Any())
            {
                Console.WriteLine("No students, recruiters, or bands available to create offers.");
                return;
            }

            for (int i = 0; i < numOffers; i++)
            {
                // Assign a random student, recruiter, and band to the offer
                var randomStudentId = faker.PickRandom(studentIds);
                var randomRecruiter = faker.PickRandom(recruiters);

                var offer = new Offer
                {
                    OfferId = Guid.NewGuid().ToString(),
                    StudentId = randomStudentId,
                    RecruiterId = randomRecruiter.RecruiterId,
                    BandId = randomRecruiter.BandId,  // Use the BandId associated with the recruiter
                    BandName = randomRecruiter.BandName, // Use the BandName associated with the recruiter
                    Amount = faker.Random.Int(1000, 10000), // Random scholarship amount
                    Status = "Pending",
                    OfferDate = DateTime.UtcNow
                };

                context.Offers.Add(offer);
                Console.WriteLine($"Created offer for student {randomStudentId} by recruiter {randomRecruiter.RecruiterId}, Band: {randomRecruiter.BandName}");
            }

            await context.SaveChangesAsync();
            Console.WriteLine("Finished creating offers.");
        }

        private static string GenerateHighSchoolName(Faker faker)
        {
            var formatOptions = new List<Func<string>>
            {
                () => $"{faker.Address.City()} High School",
                () => $"{faker.Name.LastName()} High School",
                () => $"{faker.Name.FirstName()} Academy",
                () => $"{faker.Address.City()} Academy",
                () => $"Saint {faker.Name.FirstName()} High School",
                () => $"{faker.Name.LastName()} Institute"
            };

            var randomFormat = faker.PickRandom(formatOptions);
            return randomFormat();
        }

        private static async Task CreateUserIfNotExists(UserManager<User> userManager, User user, string password, string role)
        {
            if (await userManager.FindByEmailAsync(user.Email) == null)
            {
                var result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
