using Core.Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace WebApi
{
    public static class SecurityUtils
    {
        public static SymmetricSecurityKey CreateSecurityKey(string securityToken)
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityToken));
        }

        public static void CreatePasswordHash(string password, out string hash, out string salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = Convert.ToBase64String(hmac.Key);
                hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }
        }

        public static bool VerifyPasswordHash(string password, string hash, string salt)
        {
            var bufferHash = Convert.FromBase64String(hash);
            var bufferSalt = Convert.FromBase64String(salt);

            using (var hmac = new HMACSHA512(bufferSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(bufferHash);
            }
        }

        public static string CreateJwtToken(string securityToken, User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("username", user.UserName),
                new Claim("fullname", user.FullName),
            };

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var key = CreateSecurityKey(securityToken);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var jwtToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return jwt;
        }
    }
}
