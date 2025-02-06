namespace services.MicroServices.Review.Models
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Content { get; set; } = String.Empty;
        public int Rating { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Today;
    }
}