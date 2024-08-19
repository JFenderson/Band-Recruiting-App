using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {
        public string UserType { get; set; }
    }

    //public string UserType
    //{
    //    "Student",
    //    "Recruiter",
    //    "Admin"
    //}
}
