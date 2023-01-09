using Core.Domain;
using Newtonsoft.Json;
using System.Text;

namespace UnitTests
{
    public class SecurityUtilsTests
    {
        [Fact]
        public void CanCreateJwtToken()
        {
            var securityToken = "1234567890123456";
            var user = new User
            {
                UserName = "my-username",
                FullName = "my-fullname",
                Roles = new List<string> { "A", "B", "C" }
            };

            var result = SecurityUtils.CreateJwtToken(securityToken, user);
            Assert.NotNull(result);

            var encodedData = result.Split('.')[1];
            var decodedData = Convert.FromBase64String(encodedData);
            var jsonData = Encoding.UTF8.GetString(decodedData);
            var userObject = JsonConvert.DeserializeObject<User>(jsonData);

            Assert.Equal(user.UserName, userObject.UserName);
            Assert.Equal(user.FullName, userObject.FullName);
            Assert.Equal(user.Roles.Count(), userObject.Roles.Count());
            Assert.All(user.Roles, (role) =>
            {
                userObject.Roles.Contains(role);
            });
        }

        [Theory]
        [InlineData("my-right-password", "my-right-password", true)]
        [InlineData("my-right-password", "my-Right-password", false)] // case-sensitive
        [InlineData("my-right-password", " my-right-password", false)] // white-spaces
        [InlineData("my-right-password", "my-wrong-password", false)]
        [InlineData("my-right-password", "新冠病毒感染病例激增", false)]
        [InlineData("新冠病毒感染病例激增", "新冠病毒感染病例激增", true)]
        public void CanVerifyPasswordHash(string expectedPassword, string givenPassword, bool outcome)
        {
            SecurityUtils.CreatePasswordHash(expectedPassword, out string h, out string s);

            var result = SecurityUtils.VerifyPasswordHash(givenPassword, h, s);
            Assert.Equal(outcome, result);
        }
    }
}
