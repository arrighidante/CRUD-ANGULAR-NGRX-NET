using AutoMapper;
using Products.API.Models;
using Products.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
        const int maxProductsPageSize = 20;

        // Constructor
        public ProductsController(IProductInfoRepository productInfoRepository,
            IMapper mapper) 
        {
            _productInfoRepository = productInfoRepository ?? throw new ArgumentNullException(nameof(productInfoRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        // Endpoints

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            [FromQuery] string? name, [FromQuery] string? searchQuery, int pageNumber = 1, int pageSize = 10)
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

            /* // SOLUTION WITHOUT AUTOMAPPER: Need to map from product entity to ProductDto
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
        /// <param name="includeImages">Whether or not to include the images of the products</param>
        /// <returns>An IActionResult</returns>
        /// <response code="200">Returns the requested product</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCity(
            int id, 
            bool includeImages = false)
        {

            var product = await _productInfoRepository.GetProductAsync(id, includeImages);
            
            if (product == null)
            {
                return NotFound();
            }

            //if (includeImages)
            //{
            //    var resultado = _mapper.Map<CityDto>(product);
            //    return Ok(resultado);
            //}

            return Ok(_mapper.Map<ProductDto>(product));

        }


    }
}
