using Core;
using Core.Domain;

namespace FakeDAL
{
    public class ProductRepository : IProductRepository
    {
        private List<Product> _products;

        public ProductRepository()
        {
            _products = new List<Product>
            {
                new Product{ Id = 1, Code = "AJ76D09", Name = "Product 01", Price = 123.54M, Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                new Product{ Id = 2, Code = "FH89JD5", Name = "Product 02", Price = 99.00M, Description = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
                new Product{ Id = 3, Code = "AS6BN62", Name = "Product 03", Price = 512.90M, Description = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
                new Product{ Id = 4, Code = "W98JKE7", Name = "Product 04", Price = 207.50M, Description = "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
                new Product{ Id = 5, Code = "QM76GH6", Name = "Product 05", Price = 56.00M, Description = "Contrary to popular belief, Lorem Ipsum is not simply random text." },
                new Product{ Id = 6, Code = "H387NM3", Name = "Product 06", Price = 353.00M, Description = "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia." },
                new Product{ Id = 7, Code = "K65F54B", Name = "Product 07", Price = 299.99M, Description = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." },
                new Product{ Id = 8, Code = "SLE8776", Name = "Product 08", Price = 615.00M, Description = "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text." },
                new Product{ Id = 9, Code = "V98Jk45", Name = "Product 09", Price = 128.45M, Description = "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
                new Product{ Id = 10, Code = "G234H63", Name = "Product 10", Price = 200.00M, Description = "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable." },
                new Product{ Id = 11, Code = "P93JH23", Name = "Product 11", Price = 227.15M, Description = "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." },
                new Product{ Id = 12, Code = "R1093TY", Name = "Product 12", Price = 487.80M, Description = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested." }
            };
        }

        public async Task<Product?> GetProduct(string code)
        {
            await Task.CompletedTask;
            return _products.Where(x => x.Code == code).SingleOrDefault();
        }

        public async Task<PaginatedResult<Product>> GetProducts(int page = 1, int itemsPerPage = 5)
        {
            await Task.CompletedTask;

            PaginatedResult<Product> result = new PaginatedResult<Product>();

            result.Items = _products
                .OrderBy(x => x.Code)
                .Skip(itemsPerPage * (page - 1))
                .Take(itemsPerPage)
                .ToList();

            result.CurrentPage = page;
            result.ItemsPerPage = itemsPerPage;
            result.TotalItems = _products.Count();
            result.TotalPages = (int)Math.Ceiling(result.TotalItems / (decimal)itemsPerPage);

            return result;

        }
    }
}
