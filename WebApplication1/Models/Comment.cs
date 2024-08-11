using System;

namespace server.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentType { get; set; } = string.Empty;
        public int EntityId { get; set; }
        public string CommentText { get; set; } = string.Empty ;
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public int? StudentId { get; set; }
        public Student? Student { get; set; }

        public int? BandId { get; set; }
        public Band? Band { get; set; }

        public int? VideoId { get; set; }
        public Video? Video { get; set; }
    }
}
