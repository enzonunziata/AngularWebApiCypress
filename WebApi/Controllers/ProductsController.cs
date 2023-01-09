using AutoMapper;
using Core;
using Core.Domain;
using Core.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> Index([FromQuery] int page = 1, [FromQuery] int itemsPerPage = 5)
        {
            var products = await _productRepository.GetProducts(page, itemsPerPage);
            var result = _mapper.Map<PaginatedResult<ProductListItemDto>>(products);

            return Ok(result);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> Detail(string code)
        {
            var product = await _productRepository.GetProduct(code);
            if (product == null) return NotFound();

            var result = _mapper.Map<ProductDetailDto>(product);
            return Ok(result);
        }
    }
}
