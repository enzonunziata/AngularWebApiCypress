using AutoMapper;
using Core.Domain;
using Core.Dto;

namespace WebApi
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductListItemDto>();
            CreateMap<Product, ProductDetailDto>();
            CreateMap<PaginatedResult<Product>, PaginatedResult<ProductListItemDto>>();
        }
    }
}
