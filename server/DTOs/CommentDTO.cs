using Models;

namespace server.DTOs
{
    public class CommentDTO(Comment comment)
    {
        public string CommentId { get; set; }
        public int VideoId { get; set; }
        public string RecruiterId { get; set; }
        public string RecruiterName { get; set; }
        public string Content { get; set; }
        public DateTime CommentDate { get; set; }
    }
}