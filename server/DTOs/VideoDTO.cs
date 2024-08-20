using Models;

namespace server.DTOs
{
    public class VideoDTO(Video video)
    {
        public int VideoId { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoUrl { get; set; }
        public DateTime UploadDate { get; set; }
        public double AverageRating { get; set; }
        public int CommentCount { get; set; }
    }
}