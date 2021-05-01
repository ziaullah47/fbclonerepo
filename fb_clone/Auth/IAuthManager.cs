using fb_clone.DTO;
using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Auth
{
    public interface IAuthManager
    {
        Task<AppUser> ValidateUser(LoginRequstDTO login);
        Task<string> GenerateToken(AppUser user);
    }
}
