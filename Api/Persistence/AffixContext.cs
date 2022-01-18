using Affix.Persistence.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Afix.Persistence
{
    public class AffixContext : DbContext
    {
        public DbSet<PostDataModel> Posts { get; set; }

        public DbSet<ScoreDataModel> Scores { get; set; }

        public DbSet<SubscriptionDataModel> Subscriptions { get; set; }

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
                .IsRequired()
                .HasMaxLength(500);

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Header)
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Date)
                .IsRequired();

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(150);

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Moniker)
                .IsRequired()
                .HasMaxLength(150);

            modelBuilder.Entity<PostDataModel>()
                .HasIndex(x => x.Moniker)
                .IsUnique();

            modelBuilder.Entity<PostDataModel>()
                .Property(p => p.ImageId);

            modelBuilder.Entity<PostDataModel>()
                .Property(p => p.ImageAltText);

            modelBuilder.Entity<PostDataModel>()
                .Property(p => p.IsDraft);

            modelBuilder.Entity<ScoreDataModel>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<ScoreDataModel>()
                .Property(s => s.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<PostDataModel>()
                .HasOne(p => p.Score)
                .WithOne(s => s.Post)
                .HasForeignKey<ScoreDataModel>(s => s.PostId);

            modelBuilder.Entity<ScoreDataModel>()
                .Property(x => x.Likes);

            modelBuilder.Entity<ScoreDataModel>()
                .Property(x => x.Shares);

            modelBuilder.Entity<SubscriptionDataModel>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<SubscriptionDataModel>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}