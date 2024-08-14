namespace DTO.Comment
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public int VideoId { get; set; }
        public int RecruiterId { get; set; }
        public string Text { get; set; }
    }
}
