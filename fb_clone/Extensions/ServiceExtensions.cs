using fb_clone.DTO;
using fb_clone.Exceptions;
using fb_clone.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace fb_clone.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureDbContext(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("sqlConnection"))
            );
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<AppUser, IdentityRole<int>>(options =>
            {
                options.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
        }

        public static void ConfigureModelValidationException(this ApiBehaviorOptions o)
        {
            o.SuppressMapClientErrors = true;
            o.InvalidModelStateResponseFactory = context =>
            {
                var validationErrors = context.ModelState.Where(error => error.Value.Errors.Count > 0)
                .Select(error => new ValidationError
                {
                    Name = error.Key,
                    Message = error.Value.Errors.FirstOrDefault().ErrorMessage
                }).ToList();
                var errors = new ApiErrorResponse
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Title = "Validation Errors",
                    Detail = "One or more provided values are invalid",
                    Errors = validationErrors
                };
                return new ObjectResult(errors) { StatusCode = errors.StatusCode };
            };
        }

        public static void ConfigureJwt(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetSection("JWT:ValidIssuer").Value,
                    ValidAudience = configuration.GetSection("JWT:ValidAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JWT:Secret").Value))
                };
            });
        }
    }
}
