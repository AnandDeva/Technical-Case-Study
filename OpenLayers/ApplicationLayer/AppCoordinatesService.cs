using AutoMapper;
using TechnicalCaseStudy.Interfaces;
using TechnicalCaseStudy.Mapper;
using TechnicalCaseStudy.Models;
using TechnicalCaseStudy.ViewModel;

namespace TechnicalCaseStudy.ApplicationLayer
{
    public class AppCoordinatesService : IAppCoordinates
    {
        private readonly IRepoCoordinates _repoCoordinates;
        private readonly IMapper _mapper;
        public AppCoordinatesService(IRepoCoordinates repoCoordinates) 
        {
            _repoCoordinates = repoCoordinates;
            MapperConfiguration mapperConfiguration = new(x => x.AddProfile(new AppCoordinatesMapProfile()));
            _mapper = mapperConfiguration.CreateMapper();
        }
        public List<AppCoordinatesVM> GetCoordinates()
        {
            var result = new List<AppCoordinatesVM>();
            var getcoord = _repoCoordinates.GetCoordinatesRepo();
            if (getcoord != null && getcoord.Any())
                result = _mapper.Map<List<AppCoordinatesVM>>(getcoord);
            return result;
        }

        public int SaveCoordinates(AppCoordinatesVM addCoordinates)
        {
            var request = _mapper.Map<AddCoordinates>(addCoordinates);
            var coord = _repoCoordinates.SaveCoordinatesRepo(request);
            if(coord != 0) 
                return coord;
            return 0;
        }
    }
}
