using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using services.MicroServices.User.Models;

namespace services.MicroServices.CMS.Models
{
    [Table("Blog")]
    public class BlogModel
    {
        [Key]
        public int Id { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        // public Image image { get; set; } // Best to test when API is ready to see results on the front-end
        public DateTime CreatedOn { get; set; }
        public DateTime EditedOn { get; set; }
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}