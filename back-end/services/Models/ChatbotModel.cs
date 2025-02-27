namespace services.Models
{
    public class ChatbotModel
    {
        public int Id { get; set; }
        public string UserMessage { get; set; } = String.Empty;
        public string BotResponse { get; set; } = String.Empty;
    }
}