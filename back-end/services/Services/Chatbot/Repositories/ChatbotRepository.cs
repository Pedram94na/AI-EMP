using services.Models;
using services.Services.Chatbot.Interfaces;

namespace services.Services.Chatbot.Repositories
{
    public class ChatbotRepository : IChatbotRepository
    {
        private static readonly Dictionary<string, string> Responses = new()
        {
            { "Hi", "Hello! How can I help you?" },
            { "How are you?", "I'm just a bot, but I'm doing great!" },
            { "What is your purpose?", "I am here to assist you with your queries." },
            { "Goodbye", "Have a great day!" }
        };

        public async Task<ChatbotModel> GetResponseAsync(string userMessage)
        {
            await Task.Delay(100); // Simulating async operation
            Responses.TryGetValue(userMessage, out string response);
            return new ChatbotModel { UserMessage = userMessage, BotResponse = response ?? "I'm not sure how to respond to that." };
        }
    }
}