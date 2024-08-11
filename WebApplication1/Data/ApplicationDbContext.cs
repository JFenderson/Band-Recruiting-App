using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Band> Bands { get; set; }
        public DbSet<Recruiter> Recruiters { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Video> Videos { get; set; }

        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }

        // Additional DbSet properties for other models

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //for comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Student)
                .WithMany(s => s.Comments)
                .HasForeignKey(c => c.EntityId)
                .HasConstraintName("FK_Comments_Students")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Band)
                .WithMany(s => s.Comments)
                .HasForeignKey(c => c.EntityId)
                .HasConstraintName("FK_Comments_Schools")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);

            //for ratings
            modelBuilder.Entity<Rating>()
            .HasOne(r => r.Student)
            .WithMany(s => s.Ratings)
            .HasForeignKey(r => r.EntityId)
            .HasConstraintName("FK_Ratings_Students")
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.Band)
                .WithMany(s => s.Ratings)
                .HasForeignKey(r => r.EntityId)
                .HasConstraintName("FK_Ratings_Schools")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);

            base.OnModelCreating(modelBuilder);
        }

    }
}
