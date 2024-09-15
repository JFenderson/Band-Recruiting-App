using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Models
{
    public class Video
    {
        public string VideoId { get; set; } = null!;
        public string VideoUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public string StudentId { get; set; }
        public Student Student { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
