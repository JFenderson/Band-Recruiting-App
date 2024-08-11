namespace server.Models
{
    public class Recruiter
    {
        public int RecruiterId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string School { get; set; } = string.Empty;
        public ICollection<Student> Students { get; set; }

        public int? BandId { get; set; }
        public Band? Band { get; set; }
    }
}
