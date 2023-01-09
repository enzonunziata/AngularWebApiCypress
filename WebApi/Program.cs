using Core;
using Core.Domain;
using FakeDAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    string token = builder.Configuration.GetSection("ApiConfig:SecurityToken").Value;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = SecurityUtils.CreateSecurityKey(token),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            builder.Services.Configure<ApiConfig>(builder.Configuration.GetSection("ApiConfig"));
            builder.Services.AddSingleton<IUserRepository, UserRepository>();
            builder.Services.AddSingleton<IProductRepository, ProductRepository>();

            builder.Services.AddAutoMapper(typeof(Program));

            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}