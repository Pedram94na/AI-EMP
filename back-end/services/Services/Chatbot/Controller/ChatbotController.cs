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
        private readonly IChatbotRepository chatbotRepo;

        public ChatbotController(IChatbotRepository chatbotRepo)
        {
            this.chatbotRepo = chatbotRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddQAndA([FromBody] ChatbotDto dto)
        {
            if (!ModelState.IsValid)
                BadRequest(ModelState);

            var model = dto.DtoToModel();

            var exists = await chatbotRepo.Exists(model);
            if (exists)
                Conflict("Q&A already exists.");

            await chatbotRepo.AddQAndAAsync(model);

            return Ok(model.ModelToDto());
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQAndA()
        {
            var model = await chatbotRepo.GetAllQAndAAsync();

            return Ok(model);
        }
    }
}