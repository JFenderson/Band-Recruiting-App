using WebApplication1.Models;

namespace Services
{
    public class UserService
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public User CreateUser(string plainTextPassword, string email, UserRole role)
        {
            return new User
            {
                
                PasswordHash = HashPassword(plainTextPassword),
                Email = email,
                Role = role,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
