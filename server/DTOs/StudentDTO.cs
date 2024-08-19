using Models;

namespace server.DTOs
{
    public class StudentDTO(Student student)
    {
        public string StudentId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Instrument { get; set; }
        public string HighSchool { get; set; }
        public int GraduationYear { get; set; }
    }
}