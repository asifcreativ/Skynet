using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFilterForCountSpecification(ProductSpecificationParams productParams)
        : base(q => // OR/Else condition
            (string.IsNullOrEmpty(productParams.Search) || q.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BandId.HasValue || q.ProductBrandId == productParams.BandId) &&
            (!productParams.TypeId.HasValue || q.ProductTypeId == productParams.TypeId))
        {
        }
    }
}