using WebApplication1.Models;

namespace Models
{
    public class InterestedStudent
    {
        public int InterestedStudentId { get; set; }
        public int StudentId { get; set; }
        public int BandId { get; set; }
        public bool IsInterested { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Student Student { get; set; }
        public Band Band { get; set; }
    }
}
