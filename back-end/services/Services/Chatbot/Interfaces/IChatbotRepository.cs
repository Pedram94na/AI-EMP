using services.Models;

namespace services.Services.Chatbot.Interfaces
{
    public interface IChatbotRepository
    {
        Task<ChatbotModel> GetResponseAsync(string userMessage);
    }
}