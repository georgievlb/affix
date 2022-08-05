using Afix.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using Affix.API.Services;

namespace Affix.API
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
            // if (Environment.EnvironmentName == "Local")
            // {
                services.AddCors(options =>
                {
                    options.AddPolicy("localhost", builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            // .WithMethods("PUT", "GET", "DELETE")
                            .AllowAnyHeader()
                            // .WithHeaders(HeaderNames.ContentType, HeaderNames.Authorization);
                            .AllowAnyHeader();
                    });
                });
            // }

            services.AddDbContext<AffixContext>(options => options.UseSqlServer(Configuration.GetConnectionString("AffixDb")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Affix", Version = "v1" });
            });

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = Configuration.GetValue<string>("Authority");

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false
                    };
                });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            services.AddScoped<IImageService, ImageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            //app.UseDefaultFiles();
            if (env.IsDevelopment() || env.EnvironmentName == "Local")
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Affix v1"));
                app.UseMigrationsEndPoint();
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
            app.UseRouting();
            //if (env.EnvironmentName == "Local")
            //{
            //    app.UseCors("localhost");
            //}
            app.UseCors("localhost");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
