using Microsoft.AspNetCore.Mvc;
using services.Services.Chatbot.DTOs;
using services.Services.Chatbot.Interfaces;
using services.Services.Chatbot.Mappers;

namespace services.Services.Chatbot.Controller
{
    [Route("api/chatbot")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotRepository chatbotRepository;

        public ChatbotController(IChatbotRepository chatbotRepository)
        {
            this.chatbotRepository = chatbotRepository;
        }

        [HttpPost("message")]
        public async Task<ActionResult<ChatbotDto>> GetBotResponse([FromBody] ChatbotDto dto)
        {
            var model = await chatbotRepository.GetResponseAsync(dto.UserMessage);
            return Ok(model.ChatbotModelToDto());
        }
    }
}