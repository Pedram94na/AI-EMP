namespace services.MicroServices.Review.DTOs
{
    public class ReviewDto
    {
        public string Name { get; set; } = String.Empty;
        public string Content { get; set; } = String.Empty;
        public int Rating { get; set; }
    }
}