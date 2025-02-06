namespace services.MicroServices.User.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendResetPasswordEmail(string email, string resetToken);
    }
}