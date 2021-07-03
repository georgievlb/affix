using Microsoft.EntityFrameworkCore;
using System;

public class AffixContext : DbContext
{
    public DbSet<PostDataModel> Posts { get; set; }

    public AffixContext(DbContextOptions<AffixContext> options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostDataModel>()
            .HasKey(p => p.Id)
            .HasName("PrimaryKey_Id");

        modelBuilder.Entity<PostDataModel>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<PostDataModel>()
            .Property(x => x.Content)
            .IsRequired();

                modelBuilder.Entity<PostDataModel>()
            .Property(x => x.Summary)
            .IsRequired();
    }
}