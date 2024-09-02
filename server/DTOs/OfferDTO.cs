using Models;

namespace server.DTOs
{
    public class OfferDTO
    {
        public int OfferId { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string RecruiterId { get; set; }
        public string RecruiterName { get; set; }
        public int OfferBandId { get; set; }
        public string BandName { get; set; }
        public decimal Amount { get; set; }
        public DateTime OfferDate { get; set; }
        public string Status { get; set; }

    }


}