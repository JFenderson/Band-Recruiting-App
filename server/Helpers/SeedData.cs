using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Helpers
{
    public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider, UserManager<User> userManager)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Define roles
        string[] roleNames = { "Admin", "Recruiter", "Student" };
        IdentityResult roleResult;

        // Create roles if they don't exist
        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Create test users (students)
        var student1 = new User
        {
            UserName = "student1",
            Email = "student1@example.com",
            UserType = "Student"
        };

        var student2 = new User
        {
            UserName = "student2",
            Email = "student2@example.com",
            UserType = "Student"
        };

        // Create test users (recruiters)
        var recruiter1 = new User
        {
            UserName = "recruiter1",
            Email = "recruiter1@example.com",
            UserType = "Recruiter"
        };

        var recruiter2 = new User
        {
            UserName = "recruiter2",
            Email = "recruiter2@example.com",
            UserType = "Recruiter"
        };

        // Create users and assign roles
        if (await userManager.FindByEmailAsync(student1.Email) == null)
        {
            var result = await userManager.CreateAsync(student1, "Password@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(student1, "Student");
            }
        }

        if (await userManager.FindByEmailAsync(student2.Email) == null)
        {
            var result = await userManager.CreateAsync(student2, "Password@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(student2, "Student");
            }
        }

        if (await userManager.FindByEmailAsync(recruiter1.Email) == null)
        {
            var result = await userManager.CreateAsync(recruiter1, "Password@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(recruiter1, "Recruiter");
            }
        }

        if (await userManager.FindByEmailAsync(recruiter2.Email) == null)
        {
            var result = await userManager.CreateAsync(recruiter2, "Password@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(recruiter2, "Recruiter");
            }
        }

        // Optionally, create an admin user
        var adminUser = new User
        {
            UserName = "admin",
            Email = "admin@example.com",
            UserType = "Admin"
        };

        if (await userManager.FindByEmailAsync(adminUser.Email) == null)
        {
            var result = await userManager.CreateAsync(adminUser, "Admin@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}
}
