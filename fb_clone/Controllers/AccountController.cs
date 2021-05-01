using AutoMapper;
using fb_clone.Auth;
using fb_clone.DTO;
using fb_clone.Exceptions;
using fb_clone.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fb_clone.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IAuthManager authManager;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> userManager, IAuthManager authManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.authManager = authManager;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO signUp)
        {
            var user = await userManager.FindByEmailAsync(signUp.Email);
            if (user != null)
            {
                var errors = new List<ValidationError>() {
                    new ValidationError
                    {
                        Name = "Email",
                        Message = "Email is already in used"
                    }
                };
                throw new ValidationException(errors);
            }

            user = mapper.Map<AppUser>(signUp);
            user.UserName = signUp.Email;

            var result = await userManager.CreateAsync(user, signUp.Password);
            if (!result.Succeeded)
            {
                var errors = new List<ValidationError>();
                foreach (var error in result.Errors)
                {
                    var ve = new ValidationError
                    {
                        Name = error.Code,
                        Message = error.Description
                    };
                    errors.Add(ve);
                }
                throw new ValidationException(errors);
            }
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequstDTO login)
        {
            var user = await authManager.ValidateUser(login);
            if (user == null)
            {
                throw new UnauthorizeException("Invalid credentials");
            }
            var token = await authManager.GenerateToken(user);

            var result = mapper.Map<LoginResponseDTO>(user);
            result.AccessToken = token;
            return Ok(result);

        }
    }
}
