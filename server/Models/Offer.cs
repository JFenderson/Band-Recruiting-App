using System.ComponentModel.DataAnnotations.Schema;
using Models;

namespace Models
{
    public class Offer
    {
        public int OfferId { get; set; }
        
        public decimal Amount { get; set; }
        public OfferStatus Status { get; set; }  // Enum: Pending, Accepted, Rejected
        public DateTime OfferDate { get; set; }

        // Navigation Properties
        public int OfferBandId { get; set; }  // Foreign Key
        public Band Band { get; set; }
        public string StudentId { get; set; }  // Foreign Key
        public Student Student { get; set; }
        public string RecruiterId { get; set; }  // Foreign Key
        public Recruiter Recruiter { get; set; }
        public string? StudentName { get; set; }
        public string? RecruiterName { get;set; }
        public string? BandName { get; set; }
    }

    public enum OfferStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}
