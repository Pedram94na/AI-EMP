namespace services.Services.CMS.DTOs
{
    public class BlogDto
    {
        public int Id { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageDir { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public DateTime EditedOn { get; set; }
    }
}