using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Entities
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Configure the primary key
            builder.HasKey(u => u.UserId);

            // Configure the one-to-one relationship with Student
            builder.HasOne(u => u.Student)
                   .WithOne(s => s.User)
                   .HasForeignKey<Student>(s => s.UserId);
            //.OnDelete(DeleteBehavior.Cascade);

            // Configure the one-to-one relationship with Recruiter
            builder.HasOne(u => u.Recruiter)
                   .WithOne(r => r.User)
                   .HasForeignKey<Recruiter>(r => r.UserId); // This is the key change
                   //.OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Users");

            // Configure the UserId as the primary key for User
            builder.Property(u => u.UserId)
                  .ValueGeneratedOnAdd();

            // Configure additional properties if necessary
            builder.Property(u => u.CreatedAt).IsRequired();
        }
    }
}
