using fb_clone.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public AppDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimeStamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // post likes
            modelBuilder.Entity<PostUserLikes>()
                .HasKey(pl => new { pl.PostId, pl.AppUserId });

            modelBuilder.Entity<PostUserLikes>()
                .HasOne<Post>(pl => pl.Post)
                .WithMany(p => p.PostLikes)
                .HasForeignKey(pl => pl.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostUserLikes>()
                .HasOne<AppUser>(pl => pl.AppUser)
                .WithMany(au => au.PostLikes)
                .HasForeignKey(pl => pl.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            // post comments
            modelBuilder.Entity<PostComment>()
                .HasOne<Post>(pc => pc.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(pc => pc.PostId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<PostComment>()
                .HasOne<AppUser>(pc => pc.CommentedBy)
                .WithMany(u => u.PostComments)
                .HasForeignKey(pc => pc.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PostComment>()
                .HasOne<PostComment>(x => x.Parent)
                .WithMany(x => x.Replies)
                .HasForeignKey(x => x.ParentId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            // comment likes
            modelBuilder.Entity<CommentUserLikes>()
                .HasKey(cl => new { cl.CommentId, cl.AppUserId });

            modelBuilder.Entity<CommentUserLikes>()
                .HasOne<PostComment>(cl => cl.Comment)
                .WithMany(c => c.Likes)
                .HasForeignKey(cl => cl.CommentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CommentUserLikes>()
                .HasOne<AppUser>(cl => cl.CommentedBy)
                .WithMany(au => au.CommentLikes)
                .HasForeignKey(cl => cl.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(modelBuilder);
        }

        private void UpdateTimeStamps()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is IAuditable && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((IAuditable)entity.Entity).CreatedAt = DateTime.UtcNow;
                    ((IAuditable)entity.Entity).UpdatedAt = DateTime.UtcNow;
                }
                else
                {
                    ((IAuditable)entity.Entity).UpdatedAt = DateTime.UtcNow;
                }
            }
        }
    }
}
