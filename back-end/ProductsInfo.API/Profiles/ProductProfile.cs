using AutoMapper;

namespace Products.API.Profiles
{
    public class ProductProfile: Profile
    {
        public ProductProfile() 
        {
            CreateMap<Models.ProductDto, Entities.Product>();
            CreateMap<Entities.Product, Models.ProductDto>();
            CreateMap<Entities.Product, Models.ProductForUpdateDto>();
            CreateMap<Models.ProductForUpdateDto, Entities.Product >();
        }
    }
}
