using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFilterForCountSpecification(ProductSpecificationParams productParams)
        : base(q => // OR/Else condition
            (string.IsNullOrEmpty(productParams.Search) || q.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || q.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || q.ProductTypeId == productParams.TypeId))
        {
        }
    }
}
