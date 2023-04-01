using AutoMapper;
using TechnicalCaseStudy.Models;
using TechnicalCaseStudy.ViewModel;

namespace TechnicalCaseStudy.Mapper
{
    public class AppCoordinatesMapProfile : Profile
    {
        public AppCoordinatesMapProfile()
        {
            CreateMap<AppCoordinatesVM, AddCoordinates>().ReverseMap();
        }
    }
}
