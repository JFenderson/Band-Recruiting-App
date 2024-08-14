using WebApplication1.Models;
using System.ComponentModel.DataAnnotations;
using WebApplication1.Models;

namespace DTO.Student
{
    public class StudentDTO
    {
        public int StudentId { get; set; }
        public int UserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

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

    }
}

