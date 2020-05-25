using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(dto => dto.ProductBrand, option => option.MapFrom(product => product.ProductBrand.Name))
                .ForMember(dto => dto.ProductType, option => option.MapFrom(product => product.ProductType.Name))
                .ForMember(dto => dto.PictureUrl, option => option.MapFrom<ProductUrlResolver>());
        }
    }
}