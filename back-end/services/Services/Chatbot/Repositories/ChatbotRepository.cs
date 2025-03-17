using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Models;
using services.Services.Chatbot.DTOs;
using services.Services.Chatbot.Interfaces;
using services.Services.Chatbot.Mappers;

namespace services.Services.Chatbot.Repositories
{
    public class ChatbotRepository : IChatbotRepository
    {
        private readonly ApplicationDbContext context;

        public ChatbotRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<(ChatbotQAndA Model, bool Success)> AddQAndAAsync(ChatbotDto dto)
        {
            var existingModel = await context.ChatbotQAndAs.FirstOrDefaultAsync(c => c.Question == dto.Question || c.Answer == dto.Answer);

            if (existingModel is not null)
                return (existingModel, false);

            var model = dto.ChatbotDtoToModel();

            await context.ChatbotQAndAs.AddAsync(model);
            await context.SaveChangesAsync();

            return (model, true);
        }

        public async Task<List<ChatbotQAndA>> GetAllQAndAAsync()
        {
            return await context.ChatbotQAndAs.ToListAsync();
        }

        public async Task<ChatbotQAndA> GetAnswerAsync(string question)
        {
            var answer = await context.ChatbotQAndAs.FirstOrDefaultAsync(c => c.Question == question);

            return answer ?? new ChatbotQAndA 
            { 
                Question = question, 
                Answer = "Sorry! I don't know the answer to that 😔"
            };
        }
    }
}