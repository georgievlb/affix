using Affix.IdentityServer.Data;
using Affix.IdentityServer.Models;
using Affix.IdentityServer.Services;
using Duende.IdentityServer;
//using Duende.IdentityServer.AspNetIdentity; // TODO: Check out the Duende profile service
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Affix.IdentityServer
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddRazorPages();
            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            var configuration = builder.Configuration;

            builder.Services.AddDbContext<AffixIdentityContext>(options =>
                options.UseSqlServer(builder.Configuration.GetValue<string>("AffixIdentityDb")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AffixApi", builder =>
                {
                    builder
                    // .WithOrigins(configuration.GetValue<string>("ApiUrl"))
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .WithMethods("GET");
                });
            });
            //}
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AffixIdentityContext>()
                .AddDefaultTokenProviders();

            builder.Services
                .AddIdentityServer(options =>
                {
                    options.Events.RaiseErrorEvents = true;
                    options.Events.RaiseInformationEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseSuccessEvents = true;

                // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
                })
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddInMemoryClients(Config.Clients(builder.Configuration))
                .AddAspNetIdentity<ApplicationUser>();

            builder.Services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                    // register your IdentityServer with Google at https://console.developers.google.com
                    // enable the Google+ API
                    // set the redirect URI to https://localhost:5001/signin-google
                    options.ClientId = "copy client ID from Google here";
                    options.ClientSecret = "copy client secret from Google here";
                })
                .AddLocalApi();

            builder.Services.AddDataProtection()
                .PersistKeysToFileSystem(new DirectoryInfo(@"/etc/keys"));
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy(IdentityServerConstants.LocalApi.PolicyName, policy =>
                {
                    policy.AddAuthenticationSchemes(IdentityServerConstants.LocalApi.AuthenticationScheme);
                    policy.RequireAuthenticatedUser();
                    // custom requirements
                });
            });

            builder.Services.AddTransient<IProfileService, ProfileService>();

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            var forwardedHeaderOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            forwardedHeaderOptions.KnownNetworks.Clear();
            forwardedHeaderOptions.KnownProxies.Clear();
            app.UseForwardedHeaders(forwardedHeaderOptions);
            app.UseSerilogRequestLogging();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseForwardedHeaders();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
                // app.UseForwardedHeaders();
            }

            // app.UseHttpsRedirection();
            app.UseMigrationsEndPoint();
            app.UseStaticFiles();
            app.UsePathBase("/is");
            app.UseRouting();
            app.UseCors("AffixApi");
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.MapRazorPages()
                .RequireAuthorization();

            return app;
        }
    }
}