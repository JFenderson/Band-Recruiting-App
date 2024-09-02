using Microsoft.EntityFrameworkCore;
using Models;
using server.Data;
using server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBRServerTests.UnitTests.Services
{
    public class RecruiterService_GetRecruitersByBandTests
    {
        private readonly ApplicationDbContext _context;
        private readonly RecruiterService _service;

        public RecruiterService_GetRecruitersByBandTests()
        {
            // Setting up an in-memory database context
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);
            _service = new RecruiterService(_context, null); // Passing null for UserManager as it's not used here

            // Seed the database with sample data
            SeedDatabase();
        }

        private void SeedDatabase()
        {
            var recruiters = new List<Recruiter>
            {
                new Recruiter { UserName = "recruiter1", Email = "recruiter1@example.com", BandId = 1, FirstName = "John", LastName = "Doe" },
                new Recruiter { UserName = "recruiter2", Email = "recruiter2@example.com", BandId = 1, FirstName = "Jane", LastName = "Smith" },
                new Recruiter { UserName = "recruiter3", Email = "recruiter3@example.com", BandId = 2, FirstName = "Jim", LastName = "Beam" }
            };

            _context.Users.AddRange(recruiters);
            _context.SaveChanges();
        }

        [Fact]
        public async Task GetRecruitersByBandAsync_ValidBandId_ReturnsCorrectRecruiters()
        {
            // Act
            var result = await _service.GetRecruitersByBandAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            Assert.All(result, r => Assert.Equal(1, r.BandId));
        }

        [Fact]
        public async Task GetRecruitersByBandAsync_InvalidBandId_ReturnsEmptyList()
        {
            // Act
            var result = await _service.GetRecruitersByBandAsync(99); // BandId that doesn't exist

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        // Clean up the database after each test
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}

