using Microsoft.EntityFrameworkCore;
using services.MicroServices.ContactForm.Models;
using services.MicroServices.Review.Models;
using services.MicroServices.CMS.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using services.MicroServices.User.Models;
using Microsoft.AspNetCore.Identity;

namespace services.Data
{
    public class ApplicationDbContext(DbContextOptions dbContextOptions) : IdentityDbContext<AppUser>(dbContextOptions)
    {
        public DbSet<CustomerModel> Customers { get; set; }
        public DbSet<MessageModel> Messages { get; set; }
        public DbSet<ReviewModel> Reviews { get; set; }
        public DbSet<BlogModel> Blogs { get; set; }

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