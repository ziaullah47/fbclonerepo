using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Interfaces
{
    public interface IRepositoryManager: IDisposable
    {
        IRepositoryBase<AppUser> Users { get; }
        Task SaveAsync();
    }
}
