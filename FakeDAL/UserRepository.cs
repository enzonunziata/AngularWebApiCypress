using Core;
using Core.Domain;

namespace FakeDAL
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users;

        public UserRepository()
        {
            _users = new List<User>();

            _users.Add(new User
            {
                Id = 1,
                UserName = "admin@example.com",
                FullName = "Default admin user",
                Hash = "5Yq4VX/dgUtueuY88ywbamFtgTQOLTGtR9q4SMlYK5jSeVKIIfDA1f8CEXngSSCGlMGQKwF5uOZ0U59meNEtdw==",
                Salt = "eYiewSdcJKZEY8IhgfF4YRjG+tOzsDPES09tG++Ax1TnelZpoQmL+upgVMptmQnj7sj/JaSvA8o4PNxpA/g6ggyFTfW+5yjh1TiG4UHw005jIunRvYvIqfNruxzQa9XZFeGR0sqPJLBh04vbYESygX8kHwqAruEbzmlWdX4XTSg=",
                Roles = new List<string> { "Admin" }
            });
        }

        public async Task<User?> GetUser(string username)
        {
            await Task.CompletedTask;
            return _users.Where(x => x.UserName == username).SingleOrDefault();
        }
    }
}
