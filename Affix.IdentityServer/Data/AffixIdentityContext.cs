using Affix.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Affix.IdentityServer.Data
{
    public class AffixIdentityContext : IdentityDbContext<ApplicationUser>
    {
        public AffixIdentityContext(DbContextOptions<AffixIdentityContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            // Customize the AspNetUserClaims and AspNetRoleClaims tables because SQLite by default won't auto increment the ID column because it wasn't a PK

            // AspNetUserClaims
            base.OnModelCreating(builder);

            //builder.Entity<IdentityUserClaim<string>>(b =>
            //{
            //    b.ToTable("AspNetUserClaims");
            //});

            //builder.Entity<IdentityUserClaim<string>>()
            //    .HasKey(p => p.Id);


            //builder.Entity<IdentityUserClaim<string>>()
            //    .Property(p => p.Id)
            //    .ValueGeneratedOnAdd();

            //builder.Entity<IdentityUserClaim<string>>()
            //    .Property(x => x.UserId)
            //    .IsRequired()
            //    .HasMaxLength(450);

            //builder.Entity<IdentityUserClaim<string>>()
            //    .Property(x => x.ClaimType)
            //    .IsRequired()
            //    .HasMaxLength(450);

            //builder.Entity<IdentityUserClaim<string>>()
            //    .Property(x => x.ClaimValue)
            //    .IsRequired()
            //    .HasMaxLength(450);

            //// AspNetRoleClaims
            //builder.Entity<IdentityRoleClaim<string>>(b =>
            //{
            //    b.ToTable("AspNetRoleClaims");
            //});

            //builder.Entity<IdentityRoleClaim<string>>()
            //    .HasKey(p => p.Id);


            //builder.Entity<IdentityRoleClaim<string>>()
            //    .Property(p => p.Id)
            //    .ValueGeneratedOnAdd();

            //builder.Entity<IdentityRoleClaim<string>>()
            //    .Property(x => x.RoleId)
            //    .IsRequired()
            //    .HasMaxLength(450);

            //builder.Entity<IdentityRoleClaim<string>>()
            //    .Property(x => x.ClaimType)
            //    .IsRequired()
            //    .HasMaxLength(450);

            //builder.Entity<IdentityRoleClaim<string>>()
            //    .Property(x => x.ClaimValue)
            //    .IsRequired();
        }
    }
}