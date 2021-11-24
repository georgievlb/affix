using System;
using Affix.Areas.Identity.Services;
using Affix.Models;
using Auth.Areas.Identity.Data;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(Affix.Areas.Identity.IdentityHostingStartup))]
namespace Affix.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.AddDbContext<AffixIdentityContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("AffixIdentityDb")));

                services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<AffixIdentityContext>();
            });
        }
    }
}