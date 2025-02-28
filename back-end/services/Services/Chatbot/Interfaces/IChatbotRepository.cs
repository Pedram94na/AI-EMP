using services.Models;
using services.Services.Chatbot.DTOs;

namespace services.Services.Chatbot.Interfaces
{
    public interface IChatbotRepository
    {
        Task<(ChatbotQAndA Model, bool Success)> AddQAndAAsync(ChatbotDto dto);
        Task<ChatbotQAndA> GetAnswerAsync(string userMessage);
    }
}