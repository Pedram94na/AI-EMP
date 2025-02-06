using Microsoft.AspNetCore.Identity;
using services.MicroServices.CMS.Models;

namespace services.MicroServices.User.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public List<BlogModel> Blogs { get; set; } = [];
    }
}