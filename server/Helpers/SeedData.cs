using Microsoft.AspNetCore.Identity;
using server.Models;
using System.Security.Cryptography;

namespace server.Helpers
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<User> userManager)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

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

            // Create test users (students)
            var student1 = new User
            {
                UserName = "student1",
                Email = "student1@example.com",
                UserType = "Student",
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            var student2 = new User
            {
                UserName = "student2",
                Email = "student2@example.com",
                UserType = "Student",
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            // Create test users (recruiters)
            var recruiter1 = new User
            {
                UserName = "recruiter1",
                Email = "recruiter1@example.com",
                UserType = "Recruiter",
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            var recruiter2 = new User
            {
                UserName = "recruiter2",
                Email = "recruiter2@example.com",
                UserType = "Recruiter",
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            // Create users and assign roles
            await CreateUserIfNotExists(userManager, student1, "Password@123", "Student");
            await CreateUserIfNotExists(userManager, student2, "Password@123", "Student");
            await CreateUserIfNotExists(userManager, recruiter1, "Password@123", "Recruiter");
            await CreateUserIfNotExists(userManager, recruiter2, "Password@123", "Recruiter");

            // Optionally, create an admin user
            var adminUser = new User
            {
                UserName = "admin",
                Email = "admin@example.com",
                UserType = "Admin",
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            await CreateUserIfNotExists(userManager, adminUser, "Admin@123", "Admin");
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
