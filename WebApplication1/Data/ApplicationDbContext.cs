using Microsoft.EntityFrameworkCore;
using Models;
using System;
using WebApplication1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;
using Entities;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Recruiter> Recruiters { get; set; }
        public DbSet<Band> Bands { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<InterestedStudent> InterestedStudents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RecruiterConfiguration());
            modelBuilder.ApplyConfiguration(new StudentConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RatingConfiguration());
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
            modelBuilder.ApplyConfiguration(new OfferConfiguration());
            modelBuilder.ApplyConfiguration(new InterestedStudentConfiguration());
            modelBuilder.ApplyConfiguration(new VideoConfiguration());


            //User - Student Relationship
            //modelBuilder.Entity<Student>()
            //    .HasOne(s => s.User)
            //    .WithOne(u => u.Student)
            //    .HasForeignKey<Student>(s => s.UserId)
            //    .OnDelete(DeleteBehavior.Cascade); // When User is deleted, Student is deleted.

            ////// User-Recruiter Relationship
            ////modelBuilder.Entity<Recruiter>()
            ////    .HasOne(r => r.User)
            ////    .WithOne(u => u.Recruiter)
            ////    .HasForeignKey<Recruiter>(r => r.UserId)
            ////    .OnDelete(DeleteBehavior.Cascade); // When User is deleted, Recruiter is deleted.

            ////// Recruiter-Band Relationship
            ////modelBuilder.Entity<Recruiter>()
            ////    .HasOne(r => r.Band)
            ////    .WithMany(b => b.Recruiters)
            ////    .HasForeignKey(r => r.BandId)
            ////    .OnDelete(DeleteBehavior.Cascade); // Prevents deleting Band if Recruiters exist.

            //// Video-Student Relationship
            //modelBuilder.Entity<Video>()
            //    .HasOne(v => v.Student)
            //    .WithMany(s => s.Videos)
            //    .HasForeignKey(v => v.StudentId)
            //    .OnDelete(DeleteBehavior.Cascade); // When Student is deleted, Videos are deleted.

            //// Comment-Video Relationship
            //modelBuilder.Entity<Comment>()
            //    .HasOne(c => c.Video)
            //    .WithMany(v => v.Comments)
            //    .HasForeignKey(c => c.VideoId)
            //    .OnDelete(DeleteBehavior.Cascade); // When Video is deleted, Comments are deleted.

            //// Comment-Recruiter Relationship
            //modelBuilder.Entity<Comment>()
            //    .HasOne(c => c.Recruiter)
            //    .WithMany(r => r.Comments)
            //    .HasForeignKey(c => c.RecruiterId)
            //    .OnDelete(DeleteBehavior.Restrict); // Prevents deleting Recruiter if Comments exist.

            //// Rating-Video Relationship
            //modelBuilder.Entity<Rating>()
            //    .HasOne(r => r.Video)
            //    .WithMany(v => v.Ratings)
            //    .HasForeignKey(r => r.VideoId)
            //    .OnDelete(DeleteBehavior.Cascade); // When Video is deleted, Ratings are deleted.

            //// Rating-Recruiter Relationship
            //modelBuilder.Entity<Rating>()
            //    .HasOne(r => r.Recruiter)
            //    .WithMany(rc => rc.Ratings)
            //    .HasForeignKey(r => r.RecruiterId)
            //    .OnDelete(DeleteBehavior.Restrict); // Prevents deleting Recruiter if Ratings exist.

            //// Offer-Student Relationship
            //modelBuilder.Entity<Offer>()
            //    .HasOne(o => o.Student)
            //    .WithMany(s => s.Offers)
            //    .HasForeignKey(o => o.StudentId)
            //    .OnDelete(DeleteBehavior.Cascade); // When Student is deleted, Offers are deleted.

            //// Offer-Recruiter Relationship
            //modelBuilder.Entity<Offer>()
            //    .HasOne(o => o.Recruiter)
            //    .WithMany(r => r.Offers)
            //    .HasForeignKey(o => o.RecruiterId)
            //    .OnDelete(DeleteBehavior.Cascade); // Prevents deleting Recruiter if Offers exist.

            //// Offer-Band Relationship
            //modelBuilder.Entity<Offer>()
            //    .HasOne(o => o.Band)
            //    .WithMany(b => b.Offers)
            //    .HasForeignKey(o => o.BandId)
            //    .OnDelete(DeleteBehavior.Restrict); // Prevents deleting Band if Offers exist.

            ////Band-Offer Relationship
            //modelBuilder.Entity<Offer>()
            //    .HasOne(o => o.Band)
            //    .WithMany(b => b.Offers)
            //    .HasForeignKey(o => o.BandId)
            //    .OnDelete(DeleteBehavior.Cascade);

            //// Setup relationships for InterestedStudent
            //modelBuilder.Entity<InterestedStudent>()
            //    .HasKey(s => s.InterestedStudentId);
            ////Student-Interest Relationship
            //modelBuilder.Entity<InterestedStudent>()
            //    .HasOne(s => s.Student)
            //    .WithMany(s => s.InterestedStudents)
            //    .HasForeignKey(s => s.StudentId)
            //    .OnDelete(DeleteBehavior.Cascade);
            ////Band-Interest Relationship
            //modelBuilder.Entity<InterestedStudent>()
            //.HasOne(s => s.Band)
            //.WithMany(b => b.InterestedStudents)
            //.HasForeignKey(s => s.BandId)
            //.OnDelete(DeleteBehavior.Cascade);


        }
    }
}
