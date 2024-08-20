using Models;

namespace server.Services
{
    public interface IVideoService : IService<Video>
    {
        Task<IEnumerable<Rating>> GetVideoRatingsAsync(string videoId);
        Task<IEnumerable<Comment>> GetVideoCommentsAsync(string videoId);
        Task<double> GetAverageRatingAsync(string videoId);
    }
}
