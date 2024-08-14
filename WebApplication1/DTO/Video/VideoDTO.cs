using System.ComponentModel.DataAnnotations;

namespace DTO.Video
{
    public class VideoDTO
    {
        public int VideoId { get; set; }
        public int StudentId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
