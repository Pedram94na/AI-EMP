namespace services.Services.User.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendResetPasswordEmailAsync(string email, string resetToken);
    }
}