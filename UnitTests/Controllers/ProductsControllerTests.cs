using AutoMapper;
using Core.Domain;
using Core.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers;

namespace UnitTests.Controllers
{
    public class ProductsControllerTests
    {
        private Mock<IProductRepository> _productRepositoryMock;
        private IMapper _mapper;

        public ProductsControllerTests()
        {
            _productRepositoryMock = new Mock<IProductRepository>();
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperProfile>();
            }).CreateMapper();
        }

        private ProductsController getControllerInstance()
        {
            return new ProductsController(_productRepositoryMock.Object, _mapper);
        }

        private PaginatedResult<Product> getFakeData()
        {
            return new PaginatedResult<Product>()
            {
                CurrentPage = 1,
                ItemsPerPage = 5,
                TotalItems = 3,
                TotalPages = 1,
                Items = new List<Product>
                    {
                        new Product{ Id = 1, Code = "A", Name = "Name A", Description = "Description A", Price = 100.0M },
                        new Product{ Id = 2, Code = "B", Name = "Name B", Description = "Description B", Price = 200.0M },
                        new Product{ Id = 3, Code = "C", Name = "Name C", Description = "Description C", Price = 300.0M },
                    }
            };
        }

        [Theory]
        [InlineData(false, 1, 5)]
        [InlineData(true, 2, 8)]
        public async Task CanGetProductList(bool withData, int page, int itemsPerPage)
        {
            _productRepositoryMock.Setup(x => x.GetProducts(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(getFakeData());

            var controller = getControllerInstance();

            IActionResult result;

            if (withData)
            {
                result = await controller.Index(page, itemsPerPage);
            }
            else
            {
                result = await controller.Index();
            }
            Assert.IsType<OkObjectResult>(result);

            var returnValue = ((OkObjectResult)result).Value;
            Assert.IsType<PaginatedResult<ProductListItemDto>>(returnValue);

            _productRepositoryMock.Verify(x => x.GetProducts(page, itemsPerPage));
        }

        [Fact]
        public async Task CanGetProductDetail()
        {
            string productCode = "whatever";

            _productRepositoryMock.Setup(x => x.GetProduct(It.IsAny<string>()))
                .ReturnsAsync(getFakeData().Items[0]);

            var controller = getControllerInstance();

            var result = await controller.Detail(productCode);

            Assert.IsType<OkObjectResult>(result);

            var returnValue = ((OkObjectResult)result).Value;
            Assert.IsType<ProductDetailDto>(returnValue);

            _productRepositoryMock.Verify(x => x.GetProduct(productCode));
        }

        [Fact]
        public async Task InvalidCodeShouldReturnNotFound()
        {
            string productCode = "whatever";

            _productRepositoryMock.Setup(x => x.GetProduct(It.IsAny<string>()))
                .ReturnsAsync(null as Product);

            var controller = getControllerInstance();

            var result = await controller.Detail(productCode);

            Assert.IsType<NotFoundResult>(result);

            _productRepositoryMock.Verify(x => x.GetProduct(productCode));
        }
    }
}
