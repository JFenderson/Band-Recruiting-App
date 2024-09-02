using Microsoft.EntityFrameworkCore;
using Moq;
using Models;
using server.Data;
using server.DTOs;
using server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Identity;
using server.Models;

namespace TBRServerTests.UnitTests.Services
{
    public class StudentServiceTests
    {
        private readonly StudentService _studentService;
        private readonly ApplicationDbContext _context;
        private readonly Mock<UserManager<User>> _mockUserManager;

        public StudentServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);

            // Mocking UserManager<User>
            _mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(),
                null, null, null, null, null, null, null, null
            );

            _studentService = new StudentService(_context, _mockUserManager.Object);

            // Seed the database with test data
            SeedDatabase();
        }

        private void SeedDatabase()
        {
            var student = new Student
            {
                Id = "student1",
                FirstName = "John",
                LastName = "Doe",
                Instrument = "Trumpet",
                GraduationYear = 2023,
                HighSchool = "High School 1"
            };

            _context.Users.Add(student);
            _context.SaveChanges();
        }

        [Fact]
        public async Task GetStudentById_ShouldReturnStudent()
        {
            // Act
            var studentDTO = await _studentService.GetStudentByIdAsync("student1");

            // Assert
            Assert.NotNull(studentDTO);
            Assert.Equal("John", studentDTO.FirstName);
            Assert.Equal("Trumpet", studentDTO.Instrument);
        }

        [Fact]
        public async Task CreateStudentAsync_ShouldCreateAndReturnStudent()
        {
            // Arrange
            var createStudentDTO = new CreateStudentDTO
            {
                UserName = "student2",
                Email = "student2@example.com",
                FirstName = "Jane",
                LastName = "Doe",
                Instrument = "Saxophone",
                GraduationYear = 2024,
                HighSchool = "High School 2"
            };

            // Act
            var student = await _studentService.CreateStudentAsync(createStudentDTO);

            // Assert
            Assert.NotNull(student);
            Assert.Equal("Jane", student.FirstName);
            Assert.Equal("Saxophone", student.Instrument);
            Assert.Equal(2024, student.GraduationYear);
        }

        [Fact]
        public async Task UpdateStudentAsync_ShouldUpdateAndReturnStudent()
        {
            // Arrange
            var updateStudentDTO = new UpdateStudentDTO
            {
                Email = "updated@example.com",
                FirstName = "UpdatedFirstName",
                LastName = "UpdatedLastName",
                Instrument = "UpdatedInstrument",
                GraduationYear = 2025,
                HighSchool = "UpdatedHighSchool"
            };

            // Act
            var student = await _studentService.UpdateStudentAsync("student1", updateStudentDTO);

            // Assert
            Assert.NotNull(student);
            Assert.Equal("UpdatedFirstName", student.FirstName);
            Assert.Equal("UpdatedInstrument", student.Instrument);
            Assert.Equal(2025, student.GraduationYear);
        }

        [Fact]
        public async Task GetAllStudentsAsync_ShouldReturnAllStudents()
        {
            // Act
            var students = await _studentService.GetAllStudentsAsync();

            // Assert
            Assert.NotEmpty(students);
            Assert.Equal(1, students.Count()); // Assuming there's 1 seeded student
        }

        [Fact]
        public async Task DeleteStudentAsync_ShouldReturnTrue_WhenStudentDeleted()
        {
            // Act
            var result = await _studentService.DeleteStudentAsync("student1");

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task GetStudentsByGradYearAsync_ShouldReturnStudentsWithSpecificGradYear()
        {
            // Act
            var students = await _studentService.GetStudentsByGradYearAsync(2023);

            // Assert
            Assert.NotEmpty(students);
            Assert.All(students, student => Assert.Equal(2023, student.GraduationYear));
        }

        [Fact]
        public async Task GetStudentsByInstrumentAsync_ShouldReturnStudentsWithSpecificInstrument()
        {
            // Act
            var students = await _studentService.GetStudentsByInstrumentAsync("student1", "Trumpet");

            // Assert
            Assert.NotEmpty(students);
            Assert.All(students, student => Assert.Equal("Trumpet", student.Instrument));
        }

        [Fact]
        public async Task AddInterestAsync_ShouldAddInterestAndReturnInterestDTO()
        {
            // Arrange
            var createInterestDTO = new CreateInterestDTO
            {
                StudentId = "student1",
                BandId = 1
            };

            // Act
            var interest = await _studentService.AddInterestAsync(createInterestDTO);

            // Assert
            Assert.NotNull(interest);
            Assert.Equal("student1", interest.StudentId);
            Assert.Equal(1, interest.BandId);
        }
    }
}
