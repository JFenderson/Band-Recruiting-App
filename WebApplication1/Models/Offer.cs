using System.ComponentModel.DataAnnotations.Schema;
using WebApplication1.Models;

namespace Models
{
    public class Offer
    {
        public int OfferId { get; set; }
        public int StudentId { get; set; }  // Foreign Key
        public int RecruiterId { get; set; }  // Foreign Key
        public int BandId { get; set; }  // Foreign Key
        
        public string ScholarshipAmount { get; set; }
        public OfferStatus Status { get; set; }  // Enum: Pending, Accepted, Rejected
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Student Student { get; set; }
        public Recruiter Recruiter { get; set; }
        public Band Band { get; set; }
    }

    public enum OfferStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}
