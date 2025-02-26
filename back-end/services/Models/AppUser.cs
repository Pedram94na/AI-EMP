using Microsoft.AspNetCore.Identity;

namespace services.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public List<BlogModel> Blogs { get; set; } = [];
    }
}