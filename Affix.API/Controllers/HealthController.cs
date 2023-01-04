using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Affix.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            await Task.Delay(1);

            return Ok("Healthy");
        }

    }
}
