using Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public int UserId { get; set; }  // Foreign Key
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Instrument { get; set; }
        public string HighSchool { get; set; }
        public string ProfilePicture { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        // Navigation Properties
        public User User { get; set; }
        public ICollection<Video> Videos { get; set; }
        public ICollection<Offer> Offers { get; set; }
        public ICollection<InterestedStudent> InterestedStudents { get; set; }
    }
}
