namespace Core.Domain
{
    public class JwtResult
    {
        public string Token { get; set; } = string.Empty;

        public JwtResult(string token)
        {
            Token = token;
        }
    }
}
