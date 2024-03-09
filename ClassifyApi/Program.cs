using ClassifyApi;
using Serilog;


WebApplication app;

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    builder.ConfigureServices();

    app = builder.Build();

    Log.Information("Application starting up");
}
catch (Exception ex)
{
    Log.Fatal(ex, "The application failed to start correctly");
    throw;
}
finally
{
    await Log.CloseAndFlushAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseSerilogRequestLogging();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseRateLimiter();

app.MapControllers();

app.Run();
