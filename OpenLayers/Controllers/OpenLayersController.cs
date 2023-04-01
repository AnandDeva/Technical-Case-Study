using Microsoft.AspNetCore.Mvc;
using TechnicalCaseStudy.Interfaces;
using TechnicalCaseStudy.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TechnicalCaseStudy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenLayersController : ControllerBase
    {
        private readonly IAppCoordinates _appCoordinates;
        public OpenLayersController(IAppCoordinates appCoordinates)
        {
            _appCoordinates = appCoordinates;
        }
        // GET: api/<OpenLayersController>
        [HttpGet]
        public IEnumerable<AppCoordinatesVM> Get()
        {
            var getCoordinates = _appCoordinates.GetCoordinates();
            if (getCoordinates != null && getCoordinates.Any())
                return getCoordinates;
            return Enumerable.Empty<AppCoordinatesVM>();
        }

        // POST api/<OpenLayersController>
        [HttpPost]
        public IActionResult Post([FromBody] AppCoordinatesVM appCoordinatesVM)
        {
            if(appCoordinatesVM == null)
                throw new BadHttpRequestException(nameof(appCoordinatesVM));
            var addCoordinates = _appCoordinates.SaveCoordinates(appCoordinatesVM);
            if(addCoordinates != 0)
                return Ok(addCoordinates);
            throw new Exception(nameof(appCoordinatesVM));
        }

    }
}
