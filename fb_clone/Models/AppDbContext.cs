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
            base.OnModelCreating(modelBuilder);
        }

        private void UpdateTimeStamps()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is IAuditable && ( x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach(var entity in entities)
            {
                if(entity.State == EntityState.Added)
                {
                    ((IAuditable)entity.Entity).CreatedAt = DateTime.UtcNow;
                    ((IAuditable)entity.Entity).UpdatedAt = DateTime.UtcNow;
                } else
                {
                    ((IAuditable)entity.Entity).UpdatedAt = DateTime.UtcNow;
                }
            }
        }
    }
}
