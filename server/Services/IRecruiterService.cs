using Models;
using server.DTOs;

namespace server.Services
{
    public interface IRecruiterService : IService<Recruiter>
    {
        Task<IEnumerable<Recruiter>> GetRecruitersAsync();
        Task<IEnumerable<Recruiter>> GetRecruitersByBandAsync(int bandId);
        Task<IEnumerable<Rating>> GetRecruiterRatingsAsync(string recruiterId);
        Task<IEnumerable<Comment>> GetRecruiterCommentsAsync(string recruiterId);
        Task<Recruiter> GetRecruiterByIdAsync(string recruiterId);
        Task<Recruiter> CreateRecruiterAsync(RecruiterDTO recruiterDTO);
        Task<bool> UpdateRecruiterAsync(string recruiterId, Recruiter recruiterDTO);
        Task<bool> DeleteRecruiterAsync(string recruiterId);
    }
}
