using Afix.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Affix.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Affix.Controllers
{
#if DEBUG || RELEASE
    [RestrictHost("dev.lachezargeorgiev.com")]
#endif
    [Route("[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AffixContext context;

        public SearchController(AffixContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetSearchResults([FromQuery] List<string> keywords)
        {
            var result = context.Post
                .Select(p => new PostModel
                {
                    Title = p.Title,
                    Content = p.Content,
                    Summary = p.Summary,
                    Header = p.Header,
                    Date = p.Date,
                    Moniker = p.Moniker,
                    ImageAltText = p.ImageAltText,
                    ImageId = p.ImageId

                }) // TODO: Figure out a way to executed query in DB as a queryable.
                .AsEnumerable() // Execute query in memory or else EF won't know how to transalte it to SQL.
                .Where(p => p.IsDraft == false &&
                        keywords.Any(k => k == p.Title.ToLower() || p.Title.ToLower().Contains(k) || p.Content.ToLower().Contains(k))
                       )
                .Distinct()
                .OrderByDescending(p => p.Date);

            if (result.Any())
            {
                return Ok(result);
            }

            return NoContent();
        }

    }
}
