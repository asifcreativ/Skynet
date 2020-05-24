using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandData = File.ReadAllText("../Infrastructure/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData);
                    await context.ProductBrands.AddRangeAsync(brands);
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typeData = File.ReadAllText("../Infrastructure/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typeData);
                    await context.ProductTypes.AddRangeAsync(types);
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productData = File.ReadAllText("../Infrastructure/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productData);
                    await context.Products.AddRangeAsync(products);
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