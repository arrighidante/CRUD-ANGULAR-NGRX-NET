using Products.API.Entities;

namespace Products.API.Services
{
    public interface IProductInfoRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync();

        Task<(IEnumerable<Product>, PaginationMetadata)> GetProductsAsync(
            string? name, string? searchQuery, int pageNumber, int pageSize);

        Task<Product?> GetProductAsync(int productId, bool includeImages);

        Task<bool> ProductExistsAsync(int cityId);


        void DeleteProduct(Product product);

        Task<bool> SaveChangesAsync();
}
}
