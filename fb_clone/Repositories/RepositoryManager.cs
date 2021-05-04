using fb_clone.Interfaces;
using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext context;
        private RepositoryBase<AppUser> user;

        private bool disposed = false;

        public RepositoryManager(AppDbContext context)
        {
            this.context = context;
        }

        public IRepositoryBase<AppUser> Users => user ??= new RepositoryBase<AppUser>(context);

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
