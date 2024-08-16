using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Entities
{
    public class InterestedStudentConfiguration : IEntityTypeConfiguration<InterestedStudent>
    {
        public void Configure(EntityTypeBuilder<InterestedStudent> builder)
        {
            builder.HasKey(s => s.InterestedStudentId);

            builder.HasOne(i => i.Student)
                   .WithMany(s => s.InterestedStudents)
                   .HasForeignKey(i => i.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(s => s.Band)
                   .WithMany(b => b.InterestedStudents)
                   .HasForeignKey(i => i.BandId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(s => s.IsInterested)
                   .IsRequired();
        }
    }
}
