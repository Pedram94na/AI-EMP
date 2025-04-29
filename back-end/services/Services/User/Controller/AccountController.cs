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
    
        public AccountController(
            UserManager<AppUser> userManager, SignInManager<AppUser> signinManager,
            ITokenService tokenService)
        {
            this.userManager = userManager;
            this.signinManager = signinManager;
            this.tokenService = tokenService;
        }

        [HttpPost("register/admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (dto.FirstName is null || dto.LastName is null || dto.Password is null)
                    return BadRequest("Missing fields");

                var userRole = UserRole.Admin;

                var user = new AppUser
                                {
                                    FirstName = dto.FirstName,
                                    LastName = dto.LastName,
                                    UserName = dto.Username,
                                    Email = dto.Email,
                                    Role = userRole.ToString()
                                };

                var createdUser = await userManager.CreateAsync(user, dto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(user, userRole.ToString());
                    
                    if (!roleResult.Succeeded)
                        return StatusCode(500, roleResult.Errors);

                    var roles = await userManager.GetRolesAsync(user);

                    if (roles == null || !roles.Any())
                        return BadRequest("User has no assigned roles.");

                    return Ok (
                        new AuthorizedDto
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Username = user.UserName,
                            EmailAddress = user.Email,
                            Role = roles.FirstOrDefault(),
                            Token = tokenService.Create(user)
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (dto.FirstName is null || dto.LastName is null || dto.Password is null)
                    return BadRequest("Missing fields");

                var userRole = UserRole.User;

                var user = new AppUser
                                {
                                    FirstName = dto.FirstName,
                                    LastName = dto.LastName,
                                    UserName = dto.Username,
                                    Email = dto.Email,
                                    Role = userRole.ToString()
                                };

                var createdUser = await userManager.CreateAsync(user, dto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(user, userRole.ToString());
                    
                    if (!roleResult.Succeeded)
                        return StatusCode(500, roleResult.Errors);

                    var roles = await userManager.GetRolesAsync(user);

                    if (roles == null || !roles.Any())
                        return BadRequest("User has no assigned roles.");

                    return Ok (
                        new AuthorizedDto
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Username = user.UserName,
                            EmailAddress = user.Email,
                            Role = roles.FirstOrDefault(),
                            Token = tokenService.Create(user)
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

            var roles = await userManager.GetRolesAsync(user);

            if (roles == null || !roles.Any())
                return BadRequest("Role not assigned for this user");

            return Ok (
                new AuthorizedDto
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Username = user.UserName,
                            EmailAddress = user.Email,
                            Role = roles.FirstOrDefault(),
                            Token = tokenService.Create(user)
                        }
            );
        }
    }
}