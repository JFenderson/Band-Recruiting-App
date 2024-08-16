using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Entities
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(c => c.CommentId);

            builder.HasOne(c => c.Video)
                   .WithMany(v => v.Comments)
                   .HasForeignKey(c => c.VideoId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.Recruiter)
                   .WithMany(r => r.Comments)
                   .HasForeignKey(c => c.RecruiterId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(c => c.Text)
                   .HasMaxLength(500)
                   .IsRequired();
        }
    }
}
