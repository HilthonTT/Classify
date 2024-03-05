using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ClassifyApi;

public static class RegisterServices
{
    private static void ConfigureAuthentication(this WebApplicationBuilder builder)
    {

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(x =>
            {
                x.Authority = builder.Configuration["Clerk:Authority"];
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    // Disable audience validation as we aren't using it
                    ValidateAudience = false,
                    NameClaimType = ClaimTypes.NameIdentifier
                };
                x.Events = new JwtBearerEvents()
                {
                    // Additional validation for AZP claim
                    OnTokenValidated = context =>
                    {
                        var azp = context.Principal?.FindFirstValue("azp");
                        // AuthorizedParty is the base URL of your frontend.
                        if (string.IsNullOrEmpty(azp) || azp.Equals(builder.Configuration["Clerk:AuthorizedParty"]) is false)
                        {
                            context.Fail("AZP Claim is invalid or missing");
                        }

                        return Task.CompletedTask;
                    }
                };
            });
    }

    public static void ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.ConfigureAuthentication();

        builder.Services.AddSingleton<IAuthService, AuthService>();

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
        });
    }
}
