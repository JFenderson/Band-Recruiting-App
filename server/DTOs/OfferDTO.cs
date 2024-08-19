using Models;

namespace server.DTOs
{
    public class OfferDTO(Offer offer)
    {
        public int OfferId { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string RecruiterId { get; set; }
        public string RecruiterName { get; set; }
        public int BandId { get; set; }
        public string BandName { get; set; }
        public decimal Amount { get; set; }
        public string Details { get; set; }
        public DateTime OfferDate { get; set; }
        public string Status { get; set; }
    }
}