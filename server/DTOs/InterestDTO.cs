namespace server.DTOs
{
    public class InterestDTO
    {
        public int InterestId { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public int BandId { get; set; }
        public string BandName { get; set; }
        public DateTime InterestDate { get; set; }
    }
}