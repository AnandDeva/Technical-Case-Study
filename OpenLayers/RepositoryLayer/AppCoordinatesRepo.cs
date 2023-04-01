using TechnicalCaseStudy.Interfaces;
using TechnicalCaseStudy.Models;
using TechnicalCaseStudy.ViewModel;

namespace TechnicalCaseStudy.RepositoryLayer
{
    public class AppCoordinatesRepo : IRepoCoordinates
    {
        private readonly OpenLayerDbContext _openLayerDbContext;
        public AppCoordinatesRepo(OpenLayerDbContext openLayerDbContext)
        {
            _openLayerDbContext = openLayerDbContext;
        }

        public List<AddCoordinates> GetCoordinatesRepo()
        {
            return _openLayerDbContext.AddCoordinates.ToList();
        }

        public int SaveCoordinatesRepo(AddCoordinates addCoordinates)
        {
            _openLayerDbContext.AddCoordinates.Add(addCoordinates);
            return _openLayerDbContext.SaveChanges();
        }
    }
}
