using fb_clone.DTO;
using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace fb_clone.Interfaces
{
    public interface IRepositoryBase<T> where T : class
    {

        Task<IList<T>> GetAllAsync(
             Expression<Func<T, bool>> expression = null,
             Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
             List<string> includes = null
            );

        Task<PagedList<T>> GetPagedListAsync(
            PaginationParamsDTO pagination,
            Expression<Func<T, bool>> expression = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            List<string> includes = null
    );

        Task<T> GetFirstByQueryAsync(Expression<Func<T, bool>> expression, List<string> includes = null);

        Task InsertAsync(T entity);

        Task InsertRangeAsync(IEnumerable<T> entities);

        Task DeleteByIdAsync(int id);
        void Delete(T entity);

        void DeleteRange(IEnumerable<T> entities);

        void Update(T entity);
    }
}
