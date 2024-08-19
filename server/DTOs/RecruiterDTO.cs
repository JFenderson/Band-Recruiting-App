using Models;
using server.Models;

namespace server.DTOs
{
    public class RecruiterDTO(Recruiter recruiter)
    {
        //public int RecruiterBandId { get; set; }
        //public int RecruiterId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BandId { get; set; }
        public string BandName { get; set; }

        public Band? Band { get; set; }
        public List<Offer> OffersMade { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}