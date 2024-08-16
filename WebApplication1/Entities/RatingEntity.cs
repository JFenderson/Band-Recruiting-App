using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Entities
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.HasKey(r => r.RatingId);

            builder.HasOne(r => r.Video)
                   .WithMany(v => v.Ratings)
                   .HasForeignKey(r => r.VideoId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.Recruiter)
                   .WithMany(rec => rec.Ratings)
                   .HasForeignKey(r => r.RecruiterId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(r => r.Score)
                   .IsRequired();

            builder.Property(r => r.CreatedAt)
               .HasDefaultValueSql("GETDATE()");
        }
    }
}
