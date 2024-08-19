using Models;

namespace server.DTOs
{
    public class CommentDTO(Comment comment)
    {
        public int CommentId { get; set; }
        public int VideoId { get; set; }
        public int RecruiterId { get; set; }
        public string RecruiterName { get; set; }
        public string Content { get; set; }
        public DateTime CommentDate { get; set; }
    }
}