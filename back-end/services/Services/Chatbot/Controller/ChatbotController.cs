using Microsoft.AspNetCore.Mvc;
using services.Services.Chatbot.DTOs;
using services.Services.Chatbot.Interfaces;
using services.Services.Chatbot.Mappers;

namespace services.Services.Chatbot.Controller
{
    [Route("chatbot")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotRepository chatbotRepository;

        public ChatbotController(IChatbotRepository chatbotRepository)
        {
            this.chatbotRepository = chatbotRepository;
        }

        [HttpPost("add-Q&A")]
        public async Task<IActionResult> AddQAndA([FromBody] ChatbotDto dto)
        {
            if (!ModelState.IsValid)
                BadRequest(ModelState);

            var result = await chatbotRepository.AddQAndAAsync(dto);

            return result.Success ? Ok(result.Model.ChatbotModelToDto()) : Conflict(new { message = "Q&A already exists." });
        }

        [HttpPost("message")]
        public async Task<ActionResult<ChatbotDto>> GetBotResponse([FromBody] ChatbotQuestionDto dto)
        {
            if (!ModelState.IsValid)
                BadRequest(ModelState);

            var model = await chatbotRepository.GetAnswerAsync(dto.Question);
            return Ok(model.ChatbotModelToDto());
        }
    }
}