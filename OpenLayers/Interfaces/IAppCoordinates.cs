using TechnicalCaseStudy.Models;
using TechnicalCaseStudy.ViewModel;

namespace TechnicalCaseStudy.Interfaces
{
    public interface IAppCoordinates
    {
        int SaveCoordinates(AppCoordinatesVM addCoordinates);
        List<AppCoordinatesVM> GetCoordinates();
    }
}
