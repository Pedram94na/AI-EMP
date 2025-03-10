using Microsoft.AspNetCore.Identity;

namespace services.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public bool HasReview { get; set; } = false;
        public bool HasSubscribed { get; set; } = false;
        public List<BlogModel> Blogs { get; set; } = [];
        public SubscriptionPlanModel? CurrentSubscriptionPlan { get; set; }
    }

    public enum UserRole
    {
        Admin,
        User
    }
}