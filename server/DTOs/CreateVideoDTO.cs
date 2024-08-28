namespace server.DTOs
{
    public class CreateVideoDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; } // This is used to handle the video file upload
    }
}
