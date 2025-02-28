using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using services.Models;

namespace services.Data
{
    public class ApplicationDbContext(DbContextOptions dbContextOptions) : IdentityDbContext<AppUser>(dbContextOptions)
    {
        public DbSet<CustomerModel> Customers { get; set; }
        public DbSet<MessageModel> Messages { get; set; }
        public DbSet<ReviewModel> Reviews { get; set; }
        public DbSet<BlogModel> Blogs { get; set; }
        public DbSet<SubscriptionPlanModel> SubscriptionPlans { get; set; }
        public DbSet<ChatbotQAndA> ChatbotQAndAs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<BlogModel>()
                .HasOne(b => b.AppUser)
                .WithMany(u => u.Blogs)
                .HasForeignKey(b => b.AppUserId);

            List<IdentityRole> roles = new() {
                new IdentityRole {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}