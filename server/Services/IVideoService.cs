using Models;

namespace server.Services
{
    public interface IVideoService : IService<Video>
    {
        Task<IEnumerable<Rating>> GetVideoRatingsAsync(int videoId);
        Task<IEnumerable<Comment>> GetVideoCommentsAsync(int videoId);
        Task<double> GetAverageRatingAsync(int videoId);
    }
}
