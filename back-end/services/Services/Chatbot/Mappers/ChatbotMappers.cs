using services.Services.Chatbot.DTOs;
using services.Models;

namespace services.Services.Chatbot.Mappers
{
    public static class ChatbotMappers
    {
        public static ChatbotDto ModelToDto(this Models.ChatbotModel model)
        {
            return new ChatbotDto
            {
                Question = model.Question,
                Answer = model.Answer
            };
        }

        public static ChatbotModel DtoToModel(this ChatbotDto dto)
        {
            return new ChatbotModel
            {
                Question = dto.Question,
                Answer = dto.Answer
            };
        }
    }
}