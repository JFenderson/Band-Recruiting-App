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
