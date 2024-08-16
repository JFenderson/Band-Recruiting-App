using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;


namespace WebApplication1.Models
{
    

    public class User : IdentityUser
    {
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Student? Student { get; set; }
        public Recruiter? Recruiter { get; set; }
    }

}
