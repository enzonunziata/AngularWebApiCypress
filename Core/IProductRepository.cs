using Core.Domain;

namespace Core
{
    public interface IProductRepository
    {
        Task<PaginatedResult<Product>> GetProducts(int page = 1, int itemsPerPage = 5);
        Task<Product?> GetProduct(string code);
    }
}
