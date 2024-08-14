using DTO.Student;
using WebApplication1.Models;

namespace Mappers
{
    public static class StudentMappers
    {
        public static StudentDTO ToStudentDTO(this Student studentModel)
        {
            return new StudentDTO
            {
                StudentId = studentModel.StudentId,
                FirstName = $"{studentModel.FirstName} {studentModel.LastName}",
                Email = studentModel.Email,
                Phone = studentModel.Phone
            };

        }
    }
}
