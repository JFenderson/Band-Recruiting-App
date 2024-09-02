using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using server.Controllers;
using server.Services;
using server.DTOs;
using Models;

namespace TBRServerTests.UnitTests.Controllers
{
    public class StudentControllerTests
    {
        private readonly Mock<IStudentService> _mockStudentService;
        private readonly Mock<IVideoService> _mockVideoService;
        private readonly StudentController _controller;

        public StudentControllerTests()
        {
            _mockStudentService = new Mock<IStudentService>();
            _mockVideoService = new Mock<IVideoService>();
            _controller = new StudentController(_mockStudentService.Object, _mockVideoService.Object);
        }

        // Test methods go here

        [Fact]
        public async Task GetAllStudents_ReturnsOkResult_WithListOfStudents()
        {
            // Arrange
            var students = new List<Student>
    {
        new Student { Id = "1", FirstName = "John", LastName = "Doe" },
        new Student { Id = "2", FirstName = "Jane", LastName = "Smith" }
    };
            _mockStudentService.Setup(service => service.GetAllStudentsAsync())
                               .ReturnsAsync(students);

            // Act
            var result = await _controller.GetAllStudents();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<Student>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public async Task GetStudentById_ValidId_ReturnsOkResult_WithStudentDTO()
        {
            // Arrange
            var student = new Student
            {
                Id = "1",
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                GraduationYear = 2024,
                Instrument = "Trumpet",
                HighSchool = "Some High School"
            };

            var studentDTO = new StudentDTO(student);

            _mockStudentService.Setup(service => service.GetStudentByIdAsync("1"))
                               .ReturnsAsync(studentDTO);

            // Act
            var result = await _controller.GetStudentById("1");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<StudentDTO>(okResult.Value);
            Assert.Equal("John", returnValue.FirstName);
        }


        [Fact]
        public async Task GetStudentById_InvalidId_ReturnsNotFound()
        {
            // Arrange
            _mockStudentService.Setup(service => service.GetStudentByIdAsync("1"))
                               .ThrowsAsync(new KeyNotFoundException());

            // Act
            var result = await _controller.GetStudentById("1");

            // Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }

        [Fact]
        public async Task CreateStudent_ValidStudent_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var createStudentDTO = new CreateStudentDTO
            {
                UserName = "johndoe",
                Email = "john@example.com",
                FirstName = "John",
                LastName = "Doe",
                Instrument = "Trumpet",
                GraduationYear = 2023,
                HighSchool = "High School"
            };

            var student = new Student
            {
                Id = "1",
                UserName = "johndoe",
                Email = "john@example.com",
                FirstName = "John",
                LastName = "Doe",
                Instrument = "Trumpet",
                GraduationYear = 2023,
                HighSchool = "High School"
            };

            _mockStudentService.Setup(service => service.CreateStudentAsync(createStudentDTO))
                               .ReturnsAsync(student);

            // Act
            var result = await _controller.CreateStudent(createStudentDTO);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<Student>(createdAtActionResult.Value);
            Assert.Equal("John", returnValue.FirstName);
        }


        [Fact]
        public async Task UpdateStudent_ValidId_ReturnsOkResult()
        {
            // Arrange
            var updateStudentDTO = new UpdateStudentDTO
            {
                FirstName = "UpdatedFirstName",
                LastName = "UpdatedLastName",
                Email = "updated@example.com",
                GraduationYear = 2024,
                Instrument = "Saxophone",
                HighSchool = "Updated High School"
            };

            var updatedStudent = new Student
            {
                Id = "1",
                FirstName = "UpdatedFirstName",
                LastName = "UpdatedLastName",
                Email = "updated@example.com",
                GraduationYear = 2024,
                Instrument = "Saxophone",
                HighSchool = "Updated High School"
            };

            _mockStudentService.Setup(service => service.UpdateStudentAsync("1", updateStudentDTO))
                               .ReturnsAsync(updatedStudent);

            // Act
            var result = await _controller.UpdateStudent("1", updateStudentDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<Student>(okResult.Value);
            Assert.Equal("UpdatedFirstName", returnValue.FirstName);
        }


        [Fact]
        public async Task DeleteStudent_ValidId_ReturnsNoContentResult()
        {
            // Arrange
            _mockStudentService.Setup(service => service.DeleteStudentAsync("1"))
                               .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteStudent("1");

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteStudent_InvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            _mockStudentService.Setup(service => service.DeleteStudentAsync("1"))
                               .ReturnsAsync(false);

            // Act
            var result = await _controller.DeleteStudent("1");

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

    }
}

