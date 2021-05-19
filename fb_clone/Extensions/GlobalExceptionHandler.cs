using fb_clone.DTO;
using fb_clone.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fb_clone.Extensions
{
    public static class GlobalExceptionHandler
    {
        public static void ConfigureGlobalExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.ContentType = "application/json";
                    var feature = context.Features.Get<IExceptionHandlerFeature>();
                    var statusCode = 500;
                    var title = "Internal Server Error";
                    var detail = "Something went wrong. Please try again later.";
                    var errors = new List<ValidationError>();

                    if (feature?.Error is ResourceNotFoundException nfe)
                    {
                        statusCode = 404;
                        title = "Resource Not Found";
                        detail = nfe.Message;
                    }
                    else if (feature?.Error is ResourceAlreadyExistException aee)
                    {
                        statusCode = 409;
                        title = "Resource Aleady Exist";
                        detail = aee.Message;
                    }
                    else if (feature?.Error is ValidationException ve)
                    {
                        statusCode = 400;
                        title = "Validation Error";
                        detail = "One or more provided values are invalid";
                        errors = ve.Errors;
                    }
                    else if (feature?.Error is UnauthorizeException ue)
                    {
                        statusCode = 401;
                        title = "Authorization Error";
                        detail = ue.Message;
                    }
                    else if (feature?.Error is BadRequestException be)
                    {
                        statusCode = 400;
                        title = "Bad Request";
                        detail = be.Message;
                    }

                    var apiError = new ApiErrorResponse
                    {
                        StatusCode = statusCode,
                        Title = title,
                        Detail = detail
                    };
                    if (errors.Count > 0)
                    {
                        apiError.Errors = errors;
                    }
                    context.Response.StatusCode = statusCode;
                    await context.Response.WriteAsync(apiError.ToString());

                });
            });
        }
    }
}
