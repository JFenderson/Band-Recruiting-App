namespace server.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public string RatingType { get; set; }
        public int EntityId { get; set; }
        public int RatingValue { get; set; }
        public DateTime RatedAt { get; set; }

        // Navigation properties
        public int? StudentId { get; set; }
        public Student? Student { get; set; }

        public int? BandId { get; set; }
        public Band? Band { get; set; }

        public int? VideoId { get; set; }
        public Video? Video { get; set; }
    }
}
