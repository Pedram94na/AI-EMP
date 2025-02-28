using services.Models;
using services.Services.Chatbot.DTOs;

namespace services.Services.Chatbot.Mappers
{
    public static class ChatbotMappers
    {
        public static ChatbotDto ChatbotModelToDto(this ChatbotQAndA model)
        {
            return new ChatbotDto
            {
                Question = model.Question,
                Answer = model.Answer
            };
        }

        public static ChatbotQAndA ChatbotDtoToModel(this ChatbotDto dto)
        {
            return new ChatbotQAndA
            {
                Question = dto.Question,
                Answer = dto.Answer
            };
        }
    }
}