namespace services.Services.Review.DTOs
{
    public class ReviewDto
    {
        public int Rating { get; set; }
        public string Content { get; set; } = String.Empty;
    }
}