using System.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using services.Services.User.DTOs;
using services.Services.User.Interfaces;
using services.Models;

namespace services.Services.User.Controller
{
    [Route("user")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signinManager;
        private readonly ITokenService tokenService;
        private readonly IEmailService emailService;
    
        public AccountController(
            UserManager<AppUser> userManager, SignInManager<AppUser> signinManager,
            ITokenService tokenService, IEmailService emailService)
        {
            this.userManager = userManager;
            this.signinManager = signinManager;
            this.tokenService = tokenService;
            this.emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                                {
                                    FirstName = dto.FirstName,
                                    LastName = dto.LastName,
                                    UserName = dto.Username,
                                    Email = dto.Email
                                };

                var createdUser = await userManager.CreateAsync(appUser, dto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(appUser, "User");

                    if (!roleResult.Succeeded)
                        return StatusCode(500, roleResult.Errors);

                    var roles = await userManager.GetRolesAsync(appUser);

                    return Ok (
                        new AuthorizedDto
                        {
                            FirstName = appUser.FirstName,
                            LastName = appUser.LastName,
                            Username = appUser.UserName,
                            EmailAddress = appUser.Email,
                            HasReview = appUser.HasReview,
                            Token = tokenService.Create(appUser)
                        }
                    );
                }

                return StatusCode(500, createdUser.Errors);
            }

            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManager.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == dto.Username.ToLower());

            if (user is null)
                return Unauthorized("Username not found and/or password is not valid");

            var result = await signinManager.CheckPasswordSignInAsync(user, dto.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Username not found and/or password is not valid");

            return Ok (
                new AuthorizedDto
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Username = user.UserName,
                            EmailAddress = user.Email,
                            HasReview = user.HasReview,
                            Token = tokenService.Create(user)
                        }
            );
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> SendPasswordResetLink([FromBody] PasswordResetLinkDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManager.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

            if (user is null)
                return Unauthorized("User with this email doesn't exist");

            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);

            var encodedToken = HttpUtility.UrlEncode(resetToken);

            var resetUrl = $"http://localhost:5264/api/account/reset-password?token={encodedToken}&email={user.Email}";

            var emailSent = await emailService.SendResetPasswordEmail(user.Email, resetUrl);

            if (!emailSent)
                return StatusCode(500, "Failed to send reset password link. Try again!");

            return Ok("Password reset link has been sent to your email.");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManager.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

            if (user is null)
                return Unauthorized("Invalid email");

            var decodedToken = HttpUtility.UrlDecode(dto.EncodedResetToken);

            var result = await userManager.ResetPasswordAsync(user, decodedToken, dto.NewPassword);

            if (!result.Succeeded)
                return BadRequest("Password reset failed. Please ensure the token is correct and the new password meets the requirements.");

            return Ok("Password has been successfuly reset.");
        }
    }
}