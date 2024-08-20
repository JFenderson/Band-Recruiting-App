namespace server.DTOs
{
    public class CreateRatingDTO
    {
        public int VideoId { get; set; }
        public string RecruiterId { get; set; }
        public int Score { get; set; }
    }
}
