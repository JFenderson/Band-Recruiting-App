namespace server.DTOs
{
    public class CreateCommentDTO
    {
        public int VideoId { get; set; }
        public int RecruiterId { get; set; }
        public string Content { get; set; }
    }
}
