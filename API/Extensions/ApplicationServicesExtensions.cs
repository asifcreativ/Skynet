using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        /// <summary>Extension method Add Application Services.</summary>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Note: Service Life Cycles
            // AddSingleton -> remain alive until app shutdown
            // AddTransient -> instinated for individual methond and have short lifespan.

            services.AddSingleton<IResponseCacheService, ResponseCacheService>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // configure handle validation error
            services.Configure<ApiBehaviorOptions>(option =>
            {
                option.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                    .Where(q => q.Value.Errors.Count > 0)
                    .SelectMany(q => q.Value.Errors)
                    .Select(q => q.ErrorMessage)
                    .ToArray();

                    var errorResponse = new ApiValidationErrorResponse() { Errors = errors };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}
