namespace WebApplication1.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int VideoId { get; set; }  // Foreign Key
        public int RecruiterId { get; set; }  // Foreign Key
        public int Score { get; set; }  // Integer from 1 to 5 or 1 to 10
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Video Video { get; set; }
        public Recruiter Recruiter { get; set; }
    }
}
