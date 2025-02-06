namespace services.MicroServices.User.DTOs
{
    public class PasswordResetDto
    {
        public string? Email { get; set; }
        public string? EncodedResetToken { get; set; }
        public string? NewPassword { get; set; }
    }
}