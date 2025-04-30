namespace services.Services.User.DTOs
{
    public class AuthorizedDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? EmailAddress { get; set; }
        public bool HasReview { get; set; }
        public bool IsSubscribed { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
    }
}