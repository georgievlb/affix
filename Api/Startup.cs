using Afix.Persistence;
using Auth.Areas.Identity.Data;
using Affix.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.X509Certificates;
using System.Security;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Linq;
using Microsoft.AspNetCore.HttpOverrides;
using Affix.Services;

namespace Affix
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            services.AddDbContext<AffixContext>(options => options.UseSqlServer(Configuration.GetConnectionString("AffixDb")));
            services.AddCors(options =>
            {
                options.AddPolicy("localhost",
                  builder =>
                  {
                      builder.WithOrigins(
                          "https://localhost:5002",
                          // TODO: Verify if this ClientPort is necessary
                          $"https://localhost:{Configuration["ClientPort"]}",
                          "http://54.210.9.224:80",
                          "http://localhost",
                          "http://localhost:80"
                          )
                      .WithMethods("PUT", "GET")
                      .WithHeaders(HeaderNames.ContentType, HeaderNames.Authorization);
                  });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Affix", Version = "v1" });
            });

            services.AddDatabaseDeveloperPageExceptionFilter();
            // TODO: Add a signing credential for Identity Server
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, AffixIdentityContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddControllers(); // TODO: Delete this
            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddScoped<IImageService, ImageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.EnvironmentName == "Local")
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Affix v1"));
                app.UseMigrationsEndPoint();
                app.UseForwardedHeaders();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseForwardedHeaders();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors("localhost");

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // TODO: delete this
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();

                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
