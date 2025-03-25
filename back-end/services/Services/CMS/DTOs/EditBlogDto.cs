namespace services.Services.CMS.DTOs
{
    public class EditBlogDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Image_Dir { get; set; } = string.Empty;
        public DateTime EditedOn { get; set; } = DateTime.Today;
    }
}