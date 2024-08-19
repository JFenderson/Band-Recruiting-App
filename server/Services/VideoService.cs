using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;

namespace server.Services
{
    public class VideoService : Service<Video>, IVideoService
    {
        public VideoService(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Rating>> GetVideoRatingsAsync(int videoId)
        {
            return await _context.Ratings
                .Where(r => r.VideoId == videoId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetVideoCommentsAsync(int videoId)
        {
            return await _context.Comments
                .Where(c => c.VideoId == videoId)
                .ToListAsync();
        }

        public async Task<double> GetAverageRatingAsync(int videoId)
        {
            return await _context.Ratings
                .Where(r => r.VideoId == videoId)
                .AverageAsync(r => r.Score);
        }
    }
}
