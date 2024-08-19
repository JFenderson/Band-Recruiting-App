using Models;

namespace server.DTOs
{
    public class BandDTO(Band band)
    {
        public int BandId { get; set; }
        public string Name { get; set; }
        public string SchoolName { get; set; }
        public string Description { get; set; }
        public int RecruiterCount { get; set; }
        public int InterestedStudentCount { get; set; }
    }
}
