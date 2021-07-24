using Affix.Persistence.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Afix.Persistence
{
    public class AffixContext : DbContext
    {
        public DbSet<PostDataModel> Posts { get; set; }

        public AffixContext(DbContextOptions<AffixContext> options)
            : base(options)
        { }

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

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Header)
                .IsRequired();

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Date)
                .IsRequired();
        }
    }
}