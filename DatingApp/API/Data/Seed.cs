using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    // Seed data used to develop our app. We obviously wouldn't want to do this IRL, you don't want to hard code everybody's password to 'password'.
    // This is used to populate our database/
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync())
                return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            
            // Loop through all users
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await context.Users.AddAsync(user);
            }

            await context.SaveChangesAsync();
        }
    }
}