using services.Models;
using services.Services.Chatbot.DTOs;

namespace services.Services.Chatbot.Mappers
{
    public static class ChatbotMappers
    {
        public static ChatbotDto ChatbotModelToDto(this ChatbotModel model)
        {
            return new ChatbotDto
            {
                UserMessage = model.UserMessage,
                BotResponse = model.BotResponse
            };
        }

        public static ChatbotModel ChatbotDtoToModel(this ChatbotDto dto)
        {
            return new ChatbotModel
            {
                UserMessage = dto.UserMessage,
                BotResponse = dto.BotResponse
            };
        }
    }
}