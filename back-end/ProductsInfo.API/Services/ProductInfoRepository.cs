using Products.API.DbContexts;
using Products.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Products.API.Services
{
    public class ProductInfoRepository : IProductInfoRepository
    {
        private readonly ProductInfoContext _context;

        public ProductInfoRepository(ProductInfoContext context)
        {

            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<(IEnumerable<Product>, PaginationMetadata)> GetProductsAsync(string? name, string? searchQuery, int pageNumber, int pageSize)
        {
            //if (string.IsNullOrEmpty(name) && string.IsNullOrWhiteSpace(searchQuery))
            //{
            //    return await GetCitiesAsync();
            //}

            var collection = _context.Products as IQueryable<Product>;


            if (!string.IsNullOrWhiteSpace(name))
            {
                name = name.Trim();
                collection = collection.Where(c => c.Name == name);
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                collection = collection.Where(a => a.Name.Contains(searchQuery)
                                       || (a.Description != null && a.Description.Contains(searchQuery)));
            }

            var totalItemCount = await collection.CountAsync();

            var paginationMetadata = new PaginationMetadata(
                                         totalItemCount, pageSize, pageNumber);

            var collectionToReturn = await collection.OrderBy(c => c.Name)
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return (collectionToReturn, paginationMetadata);

        }


        public async Task<Product?> GetProductAsync(int cityId, bool includePointsOfInterest)
        {
            //if (includePointsOfInterest)
            //{
            //    var resultado = await _context.Products.Include(p => p.SubObject)
            //        .Where(c => c.Id == cityId).FirstOrDefaultAsync();
            //    return resultado;
            //}

            return await _context.Products
                .Where(c => c.Id == cityId).FirstOrDefaultAsync();
        }

        public async Task<bool> ProductExistsAsync(int cityId)
        {
            return await _context.Products.AnyAsync(c => c.Id == cityId);
        }

   

      
      

        //public void DeletePointOfInterest(PointOfInterest pointOfInterest)
        //{
        //    _context.PointOfInterests.Remove(pointOfInterest);
        //}

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
    }
}
