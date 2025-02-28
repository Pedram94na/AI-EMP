namespace services.Models
{
    public class ChatbotQAndA
    {
        public int Id { get; set; }
        public string Question { get; set; } = String.Empty;
        public string Answer { get; set; } = String.Empty;
    }
}