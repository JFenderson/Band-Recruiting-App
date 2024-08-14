using System;
using System.ComponentModel.DataAnnotations;


namespace WebApplication1.Models
{
    

    public class User
    {
        public int UserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; } // Enum: Student, Recruiter, Admin
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Student Student { get; set; }
        public Recruiter Recruiter { get; set; }
    }

    public enum UserRole
    {
        Student,
        Recruiter,
        Admin
    }

}
