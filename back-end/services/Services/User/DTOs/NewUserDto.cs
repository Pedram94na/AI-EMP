namespace services.Services.User.DTOs
{
    public class NewUserDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public IList<string> Roles { get; set; } = [];
    }
}