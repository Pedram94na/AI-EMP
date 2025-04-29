using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Models;
using services.Services.Chatbot.Interfaces;

namespace services.Services.Chatbot.Repositories
{
    public class ChatbotRepository : IChatbotRepository
    {
        private readonly ApplicationDbContext context;

        public ChatbotRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> Exists(Models.ChatbotModel model)
        {
            return await context.Chatbot.AnyAsync(
                c => c.Question == model.Question || c.Answer == model.Answer
            );
        }

        public async Task<Models.ChatbotModel> AddQAndAAsync(Models.ChatbotModel model)
        {
            await context.Chatbot.AddAsync(model);
            await context.SaveChangesAsync();

            return model;
        }

        public async Task<List<Models.ChatbotModel>> GetAllQAndAAsync()
        {
            return await context.Chatbot.ToListAsync();
        }
    }
}