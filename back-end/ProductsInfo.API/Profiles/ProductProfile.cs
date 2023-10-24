using AutoMapper;

namespace Products.API.Profiles
{
    public class ProductProfile: Profile
    {
        public ProductProfile() 
        {
            CreateMap<Models.ProductDto, Entities.Product>();
            CreateMap<Entities.Product, Models.ProductDto>();
        }
    }
}
