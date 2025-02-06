namespace services.MicroServices.CMS.DTOs
{
    public class EditBlogDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        // public Image image { get; set; } // Best to test when API is ready to see results on the front-end
        public DateTime EditedOn { get; set; } = DateTime.Today;
    }
}