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
    public DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>()
            .Property(item => item.Price)
            .HasColumnType("decimal(18, 2)"); // 18 is precision, 2 is scale
    }
}
