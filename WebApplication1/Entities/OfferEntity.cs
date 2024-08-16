using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Entities
{
    public class OfferConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasKey(o => o.OfferId);

            builder.HasOne(o => o.Student)
                   .WithMany(s => s.Offers)
                   .HasForeignKey(o => o.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(o => o.Recruiter)
                   .WithMany(r => r.Offers)
                   .HasForeignKey(o => o.RecruiterId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(o => o.Band)
                   .WithMany(b => b.Offers)
                   .HasForeignKey(o => o.BandId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(o => o.ScholarshipAmount)
                   .IsRequired();

            builder.Property(o => o.Status)
                   .IsRequired();
        }
    }
}
