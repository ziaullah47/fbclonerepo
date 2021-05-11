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
        private UserRepository user;
        private RepositoryBase<Post> post;
        private RepositoryBase<PostUserLikes> postUserLike;
        private RepositoryBase<PostComment> postComment;
        private RepositoryBase<CommentUserLikes> commentLike;

        private bool disposed = false;

        public RepositoryManager(AppDbContext context)
        {
            this.context = context;
        }

        public UserRepository Users => user ??= new UserRepository(context);
        public IRepositoryBase<Post> Posts => post ??= new RepositoryBase<Post>(context);

        public IRepositoryBase<PostUserLikes> PostLikes => postUserLike ??= new RepositoryBase<PostUserLikes>(context);

        public IRepositoryBase<PostComment> PostComments => postComment ??= new RepositoryBase<PostComment>(context);

        public IRepositoryBase<CommentUserLikes> CommentLikes => commentLike ??= new RepositoryBase<CommentUserLikes>(context);

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
