namespace server.Models
{
    public class Band
    {
        public int BandId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string School { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int MembersNumber { get; set; }
        // Navigation properties
        //public int? RecruiterId { get; set; }
        //public Recruiter? Recruiter { get; set; }
        public ICollection<Recruiter>? Recruiters { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        public ICollection<Rating>? Ratings { get; set; }

    }
}
