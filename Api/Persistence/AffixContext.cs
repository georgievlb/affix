using Affix.Persistence.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;

namespace Afix.Persistence
{
    public class AffixContext : DbContext
    {
        public DbSet<PostDataModel> Post { get; set; }

        public DbSet<ScoreDataModel> Score { get; set; }

        public DbSet<SubscriptionDataModel> Subscription { get; set; }

        public DbSet<CategoryDataModel> Category { get; set; }

        public AffixContext(DbContextOptions<AffixContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Post
            modelBuilder.Entity<PostDataModel>()
                .HasKey(p => p.Id)
                .HasName("PrimaryKey_Id");

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<PostDataModel>()
                .Property(x => x.Content)
                .HasMaxLength(1000000)
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
                .Property(p => p.ImageAltText)
                .HasMaxLength(200);

            modelBuilder.Entity<PostDataModel>()
                .Property(p => p.IsDraft);

            // Foreign keys
            modelBuilder.Entity<PostDataModel>()
                .HasOne(p => p.Score)
                .WithOne(s => s.Post)
                .HasForeignKey<ScoreDataModel>(s => s.PostId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<PostDataModel>()
                .HasOne(p => p.Category)
                .WithOne(s => s.Post)
                .HasForeignKey<CategoryDataModel>(s => s.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // Score
            modelBuilder.Entity<ScoreDataModel>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<ScoreDataModel>()
                .Property(s => s.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ScoreDataModel>()
                .Property(x => x.Likes);

            modelBuilder.Entity<ScoreDataModel>()
                .Property(x => x.Shares);

            // Subscription
            modelBuilder.Entity<SubscriptionDataModel>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<SubscriptionDataModel>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Category

            modelBuilder.Entity<CategoryDataModel>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<CategoryDataModel>()
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<CategoryDataModel>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(150);

            var valueComparer = new ValueComparer<string[]>((c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToArray());

            modelBuilder.Entity<CategoryDataModel>()
                .Property(e => e.Tags)
                .HasMaxLength(500)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries), valueComparer);
        }
    }
}