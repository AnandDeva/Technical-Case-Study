using TechnicalCaseStudy.Models;

namespace TechnicalCaseStudy.Interfaces
{
    public interface IRepoCoordinates
    {
        int SaveCoordinatesRepo(AddCoordinates addCoordinates);
        List<AddCoordinates> GetCoordinatesRepo();
    }
}
