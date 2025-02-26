namespace services.Services.User.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendResetPasswordEmail(string email, string resetToken);
    }
}