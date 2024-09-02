using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using Moq;
using server.Data;
using server.DTOs;
using server.Models;
using server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBRServerTests.UnitTests.Services
{
    public class RecruiterService_CreateRecruiterTests
    {
        private readonly RecruiterService _service;
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<ApplicationDbContext> _contextMock;

        public RecruiterService_CreateRecruiterTests()
        {
            // Setting up a mock UserManager
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(store.Object, null, null, null, null, null, null, null, null);

            // Setting up an in-memory database context
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _contextMock = new Mock<ApplicationDbContext>(options);

            _service = new RecruiterService(_contextMock.Object, _userManagerMock.Object);
        }

        [Fact]
        public async Task CreateRecruiterAsync_ValidInput_ReturnsRecruiter()
        {
            // Arrange
            var recruiterDto = new CreateRecruiterDTO
            {
                UserName = "recruiter1",
                Email = "recruiter1@example.com",
                FirstName = "John",
                LastName = "Doe",
                Phone = "123-456-7890",
                ProfilePicture = "path/to/profile.jpg",
                BandId = 1,
                Password = "Password@123"
            };

            _userManagerMock.Setup(m => m.CreateAsync(It.IsAny<Recruiter>(), It.IsAny<string>()))
                            .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _service.CreateRecruiterAsync(recruiterDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(recruiterDto.Email, result.Email);
        }

        [Fact]
        public async Task CreateRecruiterAsync_InvalidUserCreation_ThrowsException()
        {
            // Arrange
            var recruiterDto = new CreateRecruiterDTO
            {
                UserName = "recruiter1",
                Email = "recruiter1@example.com",
                FirstName = "John",
                LastName = "Doe",
                Phone = "123-456-7890",
                ProfilePicture = "path/to/profile.jpg",
                BandId = 1,
                Password = "Password@123"
            };

            _userManagerMock.Setup(m => m.CreateAsync(It.IsAny<Recruiter>(), It.IsAny<string>()))
                            .ReturnsAsync(IdentityResult.Failed(new IdentityError { Description = "User creation failed" }));

            // Act & Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => _service.CreateRecruiterAsync(recruiterDto));
            Assert.Contains("User creation failed", exception.Message);
        }
    }
}
