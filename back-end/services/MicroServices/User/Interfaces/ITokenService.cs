using services.MicroServices.User.Models;

namespace services.MicroServices.User.Interfaces
{
    public interface ITokenService
    {
        string Create(AppUser appUser);
    }
}