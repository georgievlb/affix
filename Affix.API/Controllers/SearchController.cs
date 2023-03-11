using Afix.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System;
using Affix.API.Models;

namespace Affix.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AffixContext context;
        private readonly ILogger<SearchController> logger;

        public SearchController(AffixContext context, ILogger<SearchController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetSearchResults([FromQuery] List<string> keywords)
        {
            try
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

                    })
                    .AsEnumerable() // Execute query in memory or else EF won't know how to translate it to SQL.
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
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(SearchController.GetSearchResults)}, {ex.Message}, {ex.StackTrace}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
