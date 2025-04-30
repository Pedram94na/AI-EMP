using services.Models;

namespace services.Services.User.Interfaces
{
    public interface IUserStatusRepository
    {
        Task<bool> HasReviewAsync(AppUser appUser);
        Task<bool> IsSubscribedAsync(AppUser appUser);
    }
}