using AutoMapper;
using Products.API.Models;
using Products.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Products.API.Entities;

namespace Products.API.Controllers
{
    [ApiController]
    [Authorize]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/products")]
    public class ProductsController : ControllerBase
    {

        private readonly IProductInfoRepository _productInfoRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductsController> _logger;
        private readonly IMailService _mailService;
        const int maxProductsPageSize = 30;

        // Constructor
        public ProductsController(IProductInfoRepository productInfoRepository, 
            IMapper mapper, ILogger<ProductsController> logger,
            IMailService mailService) 
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _mailService = mailService ??
                throw new ArgumentNullException(nameof(mailService));
            _productInfoRepository = productInfoRepository ?? throw new ArgumentNullException(nameof(productInfoRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        // Endpoints

        /// <summary>
        /// Get all products
        /// </summary>
        /// <param name="name">The name of the product to search for</param>
        /// <param name="searchQuery">The search query to use</param>
        /// <param name="pageNumber">The page number to retrieve</param>
        /// <param name="pageSize">The number of items per page</param>
        /// <returns>An IActionResult</returns>
        /// <response code="200">Returns the requested product</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            [FromQuery] string? name, [FromQuery] string? searchQuery, int pageNumber = 1, int pageSize = 30)
        {
            if(pageSize > maxProductsPageSize)
            {
                pageSize = maxProductsPageSize;
            }

            var (productEntities, paginationMetadata) = await _productInfoRepository
                .GetProductsAsync(name, searchQuery, pageNumber, pageSize);

            Response.Headers.Add("X-Pagination",
                JsonSerializer.Serialize(paginationMetadata));

            return Ok(_mapper.Map<IEnumerable<ProductDto>>(productEntities));

            /* // SOLUTION WITHOUT AUTOMAPPER: Need to map from Entities.Product to ProductDto
            var results = new List<ProductDto>();
            foreach (var productEntity in productEntities)
            {
                results.Add(new ProductDto
                { 
                    Id = productEntity.Id,
                    Description = productEntity.Description,
                    Name = productEntity.Name,
                    ... etc
                });
            }

            return Ok(results);
            */
        }


        /// <summary>
        /// Get a product by id
        /// </summary>
        /// <param name="id">The id of the product to get</param>
        /// <returns>An IActionResult</returns>
        /// <response code="200">Returns the requested product</response>
        [HttpGet("{productId}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDto>> GetProduct(
           int productId)
        {
            if (!await _productInfoRepository.ProductExistsAsync(productId))
            {
                return NotFound();
            }

            var prod = await _productInfoRepository.GetProductAsync(productId);

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductDto>(prod));
        }



        /// <summary>
        /// Creates a product
        /// </summary>
        /// <param name="newProduct">The product to create</param>
        /// <returns>An IActionResult</returns>
        /// <response code="201">Returns the newly created product</response>
        /// <response code="400">If the product is null or invalid</response>
        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto newProduct)
        {
            if (newProduct == null)
            {
                return BadRequest();
            }

            var finalProduct = _mapper.Map<Entities.Product>(newProduct);

            await _productInfoRepository.AddProduct(finalProduct);

            await _productInfoRepository.SaveChangesAsync();

            var createdProductToReturn =
                _mapper.Map<Models.ProductDto>(finalProduct);

            return CreatedAtRoute("GetProduct",
                new
                {
                    productId = createdProductToReturn.Id

                },
                createdProductToReturn);
        }




        /// <summary>
        /// Deletes a product by id
        /// </summary>
        /// <param name="productId">The id of the product to delete</param>
        /// <returns>An IActionResult</returns>
        /// <response code="204">Product deleted successfully</response>
        /// <response code="404">Product not found</response>
        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProduct(int productId)
        {
            if (!await _productInfoRepository.ProductExistsAsync(productId))
            {
                return NotFound();
            }

            var product = await _productInfoRepository.GetProductAsync(productId);
            if (product == null)
            {
                return NotFound();
            }

            _productInfoRepository.DeleteProduct(product);

            await _productInfoRepository.SaveChangesAsync();

            _mailService.Send(
                "Product deleted",
                $"Product {product.Name} with id {product.Id} was deleted.");

            return NoContent();
        }


    }
}
