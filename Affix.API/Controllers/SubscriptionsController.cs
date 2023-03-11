using Afix.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using Affix.API.Models;
using Affix.API.Persistence.DataModels;

namespace Affix.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly AffixContext context;
        private readonly ILogger<SubscriptionsController> logger;

        public SubscriptionsController(AffixContext context, ILogger<SubscriptionsController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task <ActionResult> PutSubscription(SubscriptionModel subscriptionModel)
        {
            try
            {
                if (context.Subscription.FirstOrDefault(s => s.Email == subscriptionModel.Email) == null)
                {
                    await context.AddAsync(new SubscriptionDataModel { Email = subscriptionModel.Email });
                    await context.SaveChangesAsync();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(SubscriptionsController.PutSubscription)}, {ex.Message}, {ex.StackTrace}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
