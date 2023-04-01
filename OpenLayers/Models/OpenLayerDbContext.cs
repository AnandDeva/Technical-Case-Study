using Microsoft.EntityFrameworkCore;

namespace TechnicalCaseStudy.Models
{
    public class OpenLayerDbContext : DbContext
    {
        public OpenLayerDbContext() { }
        public OpenLayerDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<AddCoordinates> AddCoordinates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=LAPTOP-JU3072BK\\SQLEXPRESS;Initial Catalog=OpenLayers;User ID=testserver;Password=test1234;TrustServerCertificate=True");
        }

    }
}
