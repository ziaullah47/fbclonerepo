using fb_clone.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class PagedList<T> where T : class
    {
        public IEnumerable<T> Items { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }

        private PagedList(IEnumerable<T> items, int count, PaginationParamsDTO pagination)
        {
            Items = items;
            PageNumber = pagination.PageNumber;
            PageSize = pagination.PageSize;
            TotalRecords = count;
            TotalPages = (int)Math.Ceiling(count / (double)pagination.PageSize);
        }

        private PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            Items = items;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalRecords = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }


        public bool HasPreviousPage
        {
            get
            {
                return PageNumber > 1;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return TotalPages > PageNumber;
            }
        }

        public bool IsFirstPage
        {
            get
            {
                return PageNumber == 1;
            }
        }
        public bool IsLastPage
        {
            get
            {
                return PageNumber == TotalPages;
            }
        }


        public static async Task<PagedList<T>> BuildPagedList(IQueryable<T> source, PaginationParamsDTO pagination)
        {
            var count = await source.CountAsync();
            var items = await source
                .AsNoTracking()
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToListAsync();

            return new PagedList<T>(items, count, pagination);
        }

        public static PagedList<T> BuildPagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
