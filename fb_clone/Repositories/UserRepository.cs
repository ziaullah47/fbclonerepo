using fb_clone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Repositories
{
    public class UserRepository : RepositoryBase<AppUser>
    {
        public UserRepository(AppDbContext context): base(context){}

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
          return await db.AsNoTracking().FirstOrDefaultAsync(q => q.Email == email);
        }
    }
}
