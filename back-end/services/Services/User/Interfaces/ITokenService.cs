using services.Models;

namespace services.Services.User.Interfaces
{
    public interface ITokenService
    {
        string Create(AppUser appUser);
    }
}