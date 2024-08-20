using Microsoft.AspNetCore.Mvc;
using Models;
using server.Models;
using System.Text.Json.Serialization;

namespace server.DTOs
{
    [ModelBinder(BinderType = typeof(JsonModelBinder))]
    public class RecruiterDTO
    {
        //public int RecruiterBandId { get; set; }
        //public int RecruiterId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string ProfilePicture { get; set; }
        public string Password { get; set; }
        public int BandId { get; set; }

        public Band? Band { get; set; }
        public List<Offer> OffersMade { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Rating> Ratings { get; set; }

    }

}