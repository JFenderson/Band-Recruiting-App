using Models;

namespace DTO.Offer
{
    public class OfferDTO
    {
        public int OfferId { get; set; }
        public int StudentId { get; set; }
        public int RecruiterId { get; set; }
        public int BandId { get; set; }
        public string ScholarshipAmount { get; set; }
        public OfferStatus Status { get; set; }
    }
}
