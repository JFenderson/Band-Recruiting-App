namespace server.DTOs
{
    public class CreateOfferDTO
    {
        public string StudentId { get; set; }
        public string RecruiterId { get; set; }
        public int BandId { get; set; }
        public decimal Amount { get; set; }
        public DateTime OfferDate { get; set; }

    }
}
