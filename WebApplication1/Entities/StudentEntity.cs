using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Entities
{
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            // Primary Key
            builder.HasKey(s => s.StudentId);

            // Foreign Key with User
            builder.HasOne(s => s.User)
                   .WithOne(u => u.Student)
                   .HasForeignKey<Student>(s => s.UserId);

            // Foreign Key with InterestedStudent
            builder.HasMany(s => s.InterestedStudents)
                   .WithOne(s => s.Student)
                   .HasForeignKey(s => s.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Foreign Key with Offer
            builder.HasMany(s => s.Offers)
                   .WithOne(o => o.Student)
                   .HasForeignKey(o => o.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(s => s.Videos)
                .WithOne(v => v.Student)
                .HasForeignKey(v => v.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Properties Configuration
            builder.Property(s => s.FirstName).HasMaxLength(50).IsRequired();
            builder.Property(s => s.LastName).HasMaxLength(50).IsRequired();
            builder.Property(s => s.Email).HasMaxLength(100).IsRequired();
            builder.Property(s => s.Phone).HasMaxLength(15);
            builder.Property(s => s.CreatedAt).IsRequired();
            builder.Property(s => s.Instrument).HasMaxLength(100);
            builder.Property(s => s.HighSchool).HasMaxLength(100);
        }
    }
}
