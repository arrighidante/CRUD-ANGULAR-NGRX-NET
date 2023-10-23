using AutoMapper;

namespace Products.API.Profiles
{
    public class ProductProfile: Profile
    {
        public ProductProfile() 
        {
            //CreateMap<Entities.Product, Models.ProductWithImagesDto>();
            CreateMap<Entities.Product, Models.ProductDto>();
        }
    }
}
