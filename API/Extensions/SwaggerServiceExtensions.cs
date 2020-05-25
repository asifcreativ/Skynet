using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        /// <summary>Extension method  Add Swagger Service,
        /// Configure Swagger for documenting API.</summary>
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(option =>
                        {
                            option.SwaggerDoc("v1", new OpenApiInfo()
                            {
                                Title = "Skynet API",
                                Version = "v1"
                            });
                        });

            return services;
        }

        /// <summary>Extension method add swagger to middleware, 
        /// Configure Swagger for documenting API .</summary>
        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(q => q.SwaggerEndpoint("/swagger/v1/swagger.json", "Skynet API v1"));

            return app;
        }
    }
}