using Models;

namespace server.DTOs
{
    public class RatingDTO(Rating rating)
    {
        public int RatingId { get; set; }
        public int VideoId { get; set; }
        public int StudentId { get; set; }
        public int RecruiterId { get; set; }
        public string RecruiterName { get; set; }
        public int Score { get; set; }
        public DateTime RatingDate { get; set; }
    }
}