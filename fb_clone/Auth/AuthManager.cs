using fb_clone.DTO;
using fb_clone.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace fb_clone.Auth
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;

        public AuthManager(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }
        public async Task<string> GenerateToken(AppUser user)
        {
            var signinCredentials = GetSigningCredentials(user);
            var claims = await GetClaims(user);
            var token = CreateToken(signinCredentials, claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<AppUser> ValidateUser(LoginRequstDTO login)
        {
            var user = await userManager.FindByEmailAsync(login.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, login.Password))
            {
                return user;
            }
            return null;
        }

        private SigningCredentials GetSigningCredentials(AppUser user)
        {
            var key = configuration.GetSection("JWT:Secret").Value;
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<IList<Claim>> GetClaims(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await userManager.GetRolesAsync(user);
            if (roles != null && roles.Count > 0)
            {
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
            }
            return claims;
        }

        private JwtSecurityToken CreateToken(SigningCredentials credentials, IList<Claim> claims)
        {
            var token = new JwtSecurityToken(
                    issuer: configuration.GetSection("JWT:ValidIssuer").Value,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Double.Parse(configuration.GetSection("JWT:Expires").Value)),
                    signingCredentials: credentials
                );
            return token;
        }
    }
}
