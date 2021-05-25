using AutoMapper;
using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Extensions
{
    public static class PagedListMapperExtension
    {
        public static PagedList<TDestination> ToMappedPagedList<TSource, TDestination>(this PagedList<TSource> list, IMapper mapper) where TSource : class where TDestination : class
        {
            IEnumerable<TDestination> sourceList = mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(list.Items);
            PagedList<TDestination> pagedResult = PagedList<TDestination>.BuildPagedList(sourceList, list.TotalRecords, list.PageNumber, list.PageSize);
            return pagedResult;

        }
    }
}
