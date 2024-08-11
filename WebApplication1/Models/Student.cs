namespace server.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty ;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string School { get; set; } = string.Empty;
        public string PrimaryInstrument { get; set; } = string.Empty;
        public string SecondaryInstrument { get; set; } = string.Empty;
        // Navigation properties
        public ICollection<Video>? Videos { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        public ICollection<Rating>? Ratings { get; set; }
    }
}
