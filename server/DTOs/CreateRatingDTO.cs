namespace server.DTOs
{
    public class CreateRatingDTO
    {
        public int VideoId { get; set; }
        public int RecruiterId { get; set; }
        public int Score { get; set; }
    }
}
