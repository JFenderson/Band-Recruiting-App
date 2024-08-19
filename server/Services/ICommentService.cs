using server.DTOs;

namespace server.Services
{
    public interface ICommentService
    {
        Task<bool> CommentOnStudentAsync(string recruiterId, string studentId, CommentDTO commentDTO);
    }
}
