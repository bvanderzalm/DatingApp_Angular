using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Pass this on to the next middleware
                await _next(context);
            }
            catch (Exception ex)
            {
                // If we don't do this, our error will be silenced in the terminal. 
                // We tried this in the previous section and we got our own error msg that was in the catch block but we didn't get the exception info and messages in the terminal.
                _logger.LogError(ex, ex.Message);

                context.Response.ContentType = "application/json";
                // Essentially a 500 error code.
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                // Case when we are in development mode is '?'
                // Case when we are not in development mode is ':'
                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, "Internal Server Error");

                // Ensures our response just goes back as a normal Json response in camel case
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}