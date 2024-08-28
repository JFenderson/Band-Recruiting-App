using Models;
using server.DTOs;

namespace server.Services
{
    public interface ICommentService
    {
        Task<Comment> CommentOnVideoAsync(int videoId, string recruiterId, string text);
        Task<IEnumerable<Comment>> GetCommentsByStudentIdAsync(string studentId);
        Task<IEnumerable<Comment>> GetCommentsByVideoIdAsync(int videoId);
        Task<bool> CommentOnStudentAsync(string recruiterId, string studentId, CommentDTO commentDTO);
    }
}
