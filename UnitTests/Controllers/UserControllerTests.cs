using Core.Domain;
using Core.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Controllers;

namespace UnitTests.Controllers
{
    public class UserControllerTests
    {
        private Mock<IUserRepository> _userRepositoryMock;
        private Mock<IOptions<ApiConfig>> _apiConfigMock;

        public UserControllerTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _apiConfigMock = new Mock<IOptions<ApiConfig>>();

            _apiConfigMock.Setup(x => x.Value).Returns(new ApiConfig
            {
                SecurityToken = "my-security-token"
            });
        }

        [Fact]
        public async Task InvalidUserShouldReturnUnauthorized()
        {
            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).ReturnsAsync(null as User);

            var controller = new UserController(_userRepositoryMock.Object, _apiConfigMock.Object);

            var result = await controller.Login(new UserLoginDto { UserName = "username", Password = "password" });

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public async Task InvalidPasswordShouldReturnUnauthorized()
        {
            var myRightPassword = "my-right-password";
            var userLoginDto = new UserLoginDto { UserName = "my-username", Password = "my-wrong-password" };
            SecurityUtils.CreatePasswordHash(myRightPassword, out string h, out string s);

            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).ReturnsAsync(new User
            {
                UserName = userLoginDto.UserName,
                FullName = "full name",
                Id = 4,
                Hash = h,
                Salt = s
            });

            var controller = new UserController(_userRepositoryMock.Object, _apiConfigMock.Object);

            var result = await controller.Login(userLoginDto);

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public async Task ValidLoginShouldGenerateJwtToken()
        {
            var userLoginDto = new UserLoginDto { UserName = "my-username", Password = "my-right-password" };
            SecurityUtils.CreatePasswordHash(userLoginDto.Password, out string h, out string s);

            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).ReturnsAsync(new User
            {
                UserName = userLoginDto.UserName,
                FullName = "full name",
                Id = 4,
                Hash = h,
                Salt = s,
                Roles = new List<string> { "A", "B", "C" }
            });

            var controller = new UserController(_userRepositoryMock.Object, _apiConfigMock.Object);

            var result = await controller.Login(userLoginDto);

            Assert.IsType<OkObjectResult>(result);

            var returnValue = ((OkObjectResult)result).Value;
            Assert.IsType<JwtResult>(returnValue);
            Assert.True(((JwtResult)returnValue!).Token.Length > 0);
        }
    }
}
