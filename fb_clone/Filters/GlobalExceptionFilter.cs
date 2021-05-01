using fb_clone.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fb_clone.Filters
{
    public class GlobalExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order { get; } = int.MaxValue - 10;

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if(context.Exception is ResourceNotFoundException ex)
            {
                var apiEx = new ApiErrorResponse
                {
                    Title = "Resource Not Found",
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Detail = ex.Message
                };
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
