using Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    
    public class Recruiter
    {
        private int isRole;
        public int RecruiterId { get; set; }
        public int UserId { get ; set; }  // Foreign Key
        public int BandId { get; set; }  // Foreign Key
        public int Role { 
            get { return isRole; } 
            set
            {
                isRole = value;
                if(value == 1)
                {
                    Console.Write("Not a Recruiter");
                }
            }
        }  // Foreign Key
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
        public string ProfilePicture { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Band Band { get; set; }
        public ICollection<Offer> Offers { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}
