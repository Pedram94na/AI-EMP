namespace services.Services.CMS.DTOs
{
    public class BlogDto
    {
        public string Author { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        // public Image image { get; set; } // Best to test when API is ready to see results on the front-end
        public DateTime CreatedOn { get; set; }
        public DateTime EditedOn { get; set; }
    }
}