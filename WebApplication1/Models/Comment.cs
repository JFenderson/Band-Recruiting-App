using System;

namespace WebApplication1.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int VideoId { get; set; }  // Foreign Key
        public int RecruiterId { get; set; }  // Foreign Key
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Video Video { get; set; }
        public Recruiter Recruiter { get; set; }
    }
}
