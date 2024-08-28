using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.DTOs;

namespace server.Services
{
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CommentOnVideoAsync(int videoId, string recruiterId, string content)
        {
            var comment = new Comment
            {
                VideoId = videoId,
                RecruiterId = recruiterId,
                Content = content,
                CommentDate = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<IEnumerable<Comment>> GetCommentsByVideoIdAsync(int videoId)
        {
            return await _context.Comments
                .Where(c => c.VideoId == videoId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetCommentsByStudentIdAsync(string studentId)
        {
            return await _context.Comments
                .Where(c => c.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<bool> CommentOnStudentAsync(string recruiterId, string studentId, CommentDTO commentDTO)
        {
            var comment = new Comment
            {
                RecruiterId = recruiterId,
                StudentId = studentId,
                Content = commentDTO.Content,
                VideoId = commentDTO.VideoId
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
