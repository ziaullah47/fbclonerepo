using fb_clone.Models;
using fb_clone.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Interfaces
{
    public interface IRepositoryManager : IDisposable
    {
        UserRepository Users { get; }
        IRepositoryBase<Post> Posts { get; }
        IRepositoryBase<PostUserLikes> PostLikes { get; }

        IRepositoryBase<PostComment> PostComments { get; }
        IRepositoryBase<CommentUserLikes> CommentLikes { get; }
        Task SaveAsync();
    }
}
