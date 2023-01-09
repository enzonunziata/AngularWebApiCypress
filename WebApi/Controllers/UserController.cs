using Core;
using Core.Domain;
using Core.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ApiConfig _apiConfig;

        public UserController(IUserRepository userRepository, IOptions<ApiConfig> apiConfig)
        {
            _userRepository = userRepository;
            _apiConfig = apiConfig.Value;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto user)
        {
            var dbUser = await _userRepository.GetUser(user.UserName);
            if (dbUser == null) return Unauthorized();

            if (!SecurityUtils.VerifyPasswordHash(user.Password, dbUser.Hash, dbUser.Salt))
            {
                return Unauthorized();
            }

            string jwtToken = SecurityUtils.CreateJwtToken(_apiConfig.SecurityToken, dbUser);
            return Ok(new JwtResult(jwtToken));
        }
    }
}
