using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {

        public ProductsWithTypesAndBrandsSpecification(ProductSpecificationParams productParams)
        : base(q => // OR/Else condition
            (string.IsNullOrEmpty(productParams.Search) || q.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BandId.HasValue || q.ProductBrandId == productParams.BandId) &&
            (!productParams.TypeId.HasValue || q.ProductTypeId == productParams.TypeId))
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);

            // Sort or Ordering
            switch (productParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(q => q.Price);
                    break;
                case "priceDesc":
                    AddOrderByDecending(q => q.Price);
                    break;
                case "nameAsc":
                    AddOrderBy(q => q.Price);
                    break;
                case "nameDesc":
                    AddOrderByDecending(q => q.Price);
                    break;
                default:
                    AddOrderBy(q => q.Name);
                    break;
            }

            // Paging
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(q => q.Id == id)
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);
        }
    }
}