using Core.Domain;

namespace Core
{
    public interface IUserRepository
    {
        Task<User?> GetUser(string username);
    }
}
