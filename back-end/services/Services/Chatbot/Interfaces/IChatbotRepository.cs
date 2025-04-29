using services.Models;

namespace services.Services.Chatbot.Interfaces
{
    public interface IChatbotRepository
    {
        Task<bool> Exists(Models.ChatbotModel model);
        Task<Models.ChatbotModel> AddQAndAAsync(Models.ChatbotModel model);
        Task<List<Models.ChatbotModel>> GetAllQAndAAsync();
    }
}