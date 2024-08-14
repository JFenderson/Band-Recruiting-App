using Models;
using System;

namespace WebApplication1.Models
{
    public class Band
    {
        public int BandId { get; set; }
        public string Name { get; set; }
        public string SchoolName { get; set; }
        public string Location { get; set; }
        public int NumberOfMembers { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public ICollection<Recruiter>? Recruiters { get; set; } = new List<Recruiter>();
        public ICollection<Offer>? Offers { get; set; } = new List<Offer>();
        public ICollection<InterestedStudent> InterestedStudents { get; set; } = new List<InterestedStudent>();
    }
}
