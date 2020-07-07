using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

                // SEED DATA FOR PRODUCTS
                if (!context.ProductBrands.Any())
                {
                    var brandData = File.ReadAllText(path + @"/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData);
                    await context.ProductBrands.AddRangeAsync(brands);
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typeData = File.ReadAllText(path + @"/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typeData);
                    await context.ProductTypes.AddRangeAsync(types);
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productData = File.ReadAllText(path + @"/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productData);
                    await context.Products.AddRangeAsync(products);
                    await context.SaveChangesAsync();
                }

                // SEED DATA FOR ORDER
                if (!context.DeliveryMethods.Any())
                {
                    var deliveryMethodsData = File.ReadAllText(path + @"/Data/SeedData/delivery.json");
                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryMethodsData);
                    await context.DeliveryMethods.AddRangeAsync(deliveryMethods);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                loggerFactory.CreateLogger<StoreContextSeed>().LogError(ex.Message);
            }

        }
    }
}
