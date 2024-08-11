namespace server.Models
{
    public class Video
    {
        public int VideoId { get; set; }
        public string Url { get; set; } = string.Empty;
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
