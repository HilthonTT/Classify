﻿using ClassifyApi.Authentication;
using ClassifyApi.Authentication.Interfaces;
using ClassifyApi.Library.Contexts;
using ClassifyApi.Library.DataAccess;
using ClassifyApi.Library.DataAccess.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Threading.RateLimiting;
using Serilog;

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
                        var azp = context.Principal?.FindFirstValue("aud");
                        // AuthorizedParty is the base URL of your frontend.
                        if (string.IsNullOrEmpty(azp) || azp.Equals(builder.Configuration["Clerk:Template"]) is false)
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

        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

        builder.Services.AddRateLimiter(options =>
        {
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
            {
                return RateLimitPartition.GetTokenBucketLimiter<string>("TokenBased",
                    _ => new TokenBucketRateLimiterOptions()
                    {
                        TokenLimit = 50,
                        QueueProcessingOrder = QueueProcessingOrder.NewestFirst,
                        QueueLimit = 0,
                        ReplenishmentPeriod = TimeSpan.FromSeconds(10),
                        TokensPerPeriod = 10,
                        AutoReplenishment = true,
                    });
            });
            options.RejectionStatusCode = 429;
        });

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                string?[] origins = builder.Configuration.GetSection("Origins").GetChildren().Select(x => x.Value).ToArray();

                policy.WithOrigins(origins!);
            });
        });

        var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration).CreateLogger();

        builder.Services.AddSerilog();
        builder.Services.AddMemoryCache();
        builder.Services.AddOutputCache(options =>
        {
            options.AddPolicy("Summary", policy =>
            {
                policy.Expire(TimeSpan.FromSeconds(30));
            });
        });

        builder.Services.AddSingleton<IAuthService, AuthService>();
        builder.Services.AddTransient<IItemData, ItemData>();
        builder.Services.AddTransient<IActivityLogData, ActivityLogData>();
        builder.Services.AddTransient<IFolderData, FolderData>();
        builder.Services.AddTransient<ITagData, TagData>();
        builder.Services.AddTransient<ISummaryData, SummaryData>();

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
        });
    }
}
