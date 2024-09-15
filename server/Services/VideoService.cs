using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;

namespace server.Services
{
    public class VideoService : Service<Video>, IVideoService
    {
        public VideoService(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Rating>> GetVideoRatingsAsync(string videoId)
        {
            return await _context.Ratings
                .Where(r => r.VideoId == videoId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetVideoCommentsAsync(string videoId)
        {
            return await _context.Comments
                .Where(c => c.VideoId == videoId)
                .ToListAsync();
        }

        public async Task<double> GetAverageRatingAsync(string videoId)
        {
            return await _context.Ratings
                .Where(r => r.VideoId == videoId)
                .AverageAsync(r => r.Score);
        }

        public async Task AddAsync(Video video)
        {
            _context.Videos.Add(video);
            await _context.SaveChangesAsync();
        }

        public async Task<string> SaveVideoAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("No file provided.");

            var filePath = Path.Combine("wwwroot/videos", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the relative path to the video
            return $"/videos/{file.FileName}";
        }

    }
}
