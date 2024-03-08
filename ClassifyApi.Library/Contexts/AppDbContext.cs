using ClassifyApi.Library.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassifyApi.Library.Contexts;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
    public DbSet<Folder> Folders { get; set; }
    public DbSet<ActivityLog> ActivityLogs { get; set; }
}
