using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Data
{
    public class IdentityAppDbContext : IdentityDbContext<User>
    {
        public IdentityAppDbContext(DbContextOptions<IdentityAppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            // Customizations to the Identity model can go here
        }
    }
}
