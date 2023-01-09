namespace Core.Domain
{
    public class PaginatedResult<T> where T : class
    {
        public List<T> Items { get; set; } = default!;
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
    }
}
