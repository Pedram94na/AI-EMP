using System.Net;
using System.Net.Mail;
using services.Services.User.Interfaces;

namespace services.Services.User.Services
{
    public class EmailService : IEmailService
    {
        private readonly string smtpHost;
        private readonly int smtpPort;
        private readonly string smtpUsername;
        private readonly string smtpPassword;
        private readonly string fromEmail;
        private readonly string fromName;

        public EmailService(string smtpHost, string smtpPort, string smtpUsername,
                            string smtpPassword, string fromEmail, string fromName)
        {
            this.smtpHost = smtpHost;
            this.smtpPort = int.Parse(smtpPort);
            this.smtpUsername = smtpUsername;
            this.smtpPassword = smtpPassword;
            this.fromEmail = fromEmail;
            this.fromName = fromName;
        }
        
        public async Task<bool> SendResetPasswordEmailAsync(string email, string resetUrl)
        {
            try
            {
                var fromAddress = new MailAddress(fromEmail, fromName);
                var toAddress = new MailAddress(email);

                string subject = "Password Reset Request";
                string body = $"<p>You can reset your password using the following link:</p><a href='{resetUrl}'>Reset Password</a>";

                var message = new MailMessage
                {
                    From = fromAddress,
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true // Set to true for HTML content
                };

                message.To.Add(toAddress);

                using var smtpClient = new SmtpClient(smtpHost, smtpPort);
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                smtpClient.EnableSsl = true; // Keep this true for port 587

                await smtpClient.SendMailAsync(message);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email send failed: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return false;
            }
        }
    }
}