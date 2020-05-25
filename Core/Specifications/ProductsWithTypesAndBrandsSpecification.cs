using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification()
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(q => q.Id == id)
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);
        }
    }
}