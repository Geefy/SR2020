using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CookieAuthSampleAPI;
using CaseApi;
using CaseApi.Extensions;
using AutoMapper;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CookieAuthSampleAPI.Models;
using System.Text;
using CookieAuthSampleAPI.DBContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.HttpOverrides;

namespace SR2020Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {       
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseBranchWithServices("/Api", services =>
            {
                services.ConfigureCors();
                services.ConfigureIISIntegration();
                services.ConfigureLoggerService();
                services.AddAutoMapper(typeof(Startup));
                services.AddDbContext<RepositoryContext>(opts => opts.UseSqlServer(Configuration["ConnectionStrings:sqlConnection"]));
                services.ConfigureRepositoryWrapper();
                services.AddControllers().AddNewtonsoftJson();
                services.AddControllers();
            },
            app =>
            {
                app.UseHttpsRedirection();
                app.UseStaticFiles();

                app.UseCors("CorsPolicy");

                app.UseForwardedHeaders(new ForwardedHeadersOptions
                {
                    ForwardedHeaders = ForwardedHeaders.All
                });

                app.UseRouting();

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            });

            app.UseBranchWithServices("/Login", services =>
            {
                services.ConfigureCors();
                services.ConfigureIISIntegration();
                services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlConnection")));

                services.AddIdentity<AppUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false).AddEntityFrameworkStores<AppDbContext>();

                //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                //{
                //    options.SlidingExpiration = true;
                //    options.ExpireTimeSpan = new TimeSpan(0, 5, 0);
                //});
                services.AddMvcCore().AddAuthorization();
                services.AddAuthentication()
                    .AddCookie(cfg =>
                    {
                        cfg.SlidingExpiration = true;
                        cfg.ExpireTimeSpan = new TimeSpan(0, 1, 0);
                        cfg.LoginPath = "Index.aspx";
                    })
                    .AddJwtBearer(cfg =>
                    {
                        cfg.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ClockSkew = TimeSpan.FromMinutes(2),
                            //RequireExpirationTime = true,
                            RequireSignedTokens = true,
                            ValidateLifetime = true,
                            ValidateIssuer = true,

                            ValidIssuer = SRJwtTokens.Issuer,
                            ValidAudience = SRJwtTokens.Audience,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SRJwtTokens.Key))
                        };
                    });
                services.AddControllers();
            },
            app =>
            {
                app.UseHttpsRedirection();
                app.UseStaticFiles();

                app.UseCors("CorsPolicy");

                app.UseForwardedHeaders(new ForwardedHeadersOptions
                {
                    ForwardedHeaders = ForwardedHeaders.All
                });

                app.UseRouting();

                app.UseAuthentication();

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            });

            app.UseBranchWithServices("", services =>
            {
                services.AddRazorPages();
                services.AddSession(options =>
                {
                    options.IdleTimeout = TimeSpan.FromMinutes(30);
                });
            },
            app =>
            {
                app.UseHttpsRedirection();
                app.UseStaticFiles();
                app.UseSession();
                app.UseRouting();
                app.UseAuthorization();
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapRazorPages();
                });

            });
        }
    }
}
