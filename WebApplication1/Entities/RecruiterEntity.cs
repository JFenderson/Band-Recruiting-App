using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Entities
{
    public class RecruiterConfiguration : IEntityTypeConfiguration<Recruiter>
    {
        public void Configure(EntityTypeBuilder<Recruiter> builder)
        {
            // Primary Key
            builder.HasKey(r => r.RecruiterId);

            // Foreign Key with User
            builder.HasOne(r => r.User)
                   .WithOne(u => u.Recruiter)
                   .HasForeignKey<Recruiter>(r => r.UserId); // Use UserId as FK
                   //.OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Recruiters");

            // Foreign Key with Band
            builder.HasOne(r => r.Band)
                   .WithMany(b => b.Recruiters)
                   .HasForeignKey(r => r.BandId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Foreign Key with Rating
            builder.HasMany(r => r.Ratings)
                   .WithOne(rt => rt.Recruiter)
                   .HasForeignKey(rt => rt.RecruiterId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Foreign Key with Comment
            builder.HasMany(r => r.Comments)
                   .WithOne(c => c.Recruiter)
                   .HasForeignKey(c => c.RecruiterId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Other properties
            builder.Property(r => r.FirstName).HasMaxLength(50).IsRequired();
            builder.Property(r => r.LastName).HasMaxLength(50).IsRequired();
            builder.Property(r => r.Email).HasMaxLength(100).IsRequired();
            builder.Property(r => r.CreatedAt).IsRequired();
        }
    }
}
