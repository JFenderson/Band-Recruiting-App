using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApplication1.Models;

namespace Entities
{
    public class VideoConfiguration : IEntityTypeConfiguration<Video>
    {
        public void Configure(EntityTypeBuilder<Video> builder)
        {

            builder.HasKey(v => v.VideoId);

            builder.Property(v => v.VideoUrl)
                .IsRequired();

            builder.Property(v => v.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(v => v.Description)
                .HasMaxLength(500);

            builder.Property(v => v.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            // One-to-Many relationship between Video and Student
            builder.HasOne(v => v.Student)
                .WithMany(s => s.Videos)
                .HasForeignKey(v => v.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many relationship between Video and Comment
            builder.HasMany(v => v.Comments)
                .WithOne(c => c.Video)
                .HasForeignKey(c => c.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many relationship between Video and Rating
            builder.HasMany(v => v.Ratings)
                .WithOne(r => r.Video)
                .HasForeignKey(r => r.VideoId)
                .OnDelete(DeleteBehavior.Cascade);


     
        }
    }
}
