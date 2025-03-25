namespace services.Services.CMS.DTOs
{
    public class CreateBlogDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageDir { get; set; } = string.Empty;
    }
}