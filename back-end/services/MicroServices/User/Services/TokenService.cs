using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using services.MicroServices.User.Interfaces;
using services.MicroServices.User.Models;

namespace services.MicroServices.User.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration config;
        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration config)
        {
            this.config = config;

            var signinKey = config["JWT:SigninKey"];
            
            if (string.IsNullOrEmpty(signinKey))
                throw new ArgumentNullException("JWT:SigninKey cannot be null or empty.");

            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signinKey));
        }

        public string Create(AppUser appUser)
        {
            ArgumentNullException.ThrowIfNull(appUser);

            var email = appUser.Email ?? throw new ArgumentNullException(nameof(appUser.Email));
            var username = appUser.UserName ?? throw new ArgumentNullException(nameof(appUser.UserName));

            var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Email, email),
                            new Claim(JwtRegisteredClaimNames.GivenName, username)
                        };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
                                    {
                                        Subject = new ClaimsIdentity(claims),
                                        Expires = DateTime.Now.AddDays(7),
                                        SigningCredentials = creds,
                                        Issuer = config["JWT:Issuer"],
                                        Audience = config["JWT:Audience"]
                                    };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}