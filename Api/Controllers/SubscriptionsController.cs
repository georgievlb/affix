using Affix.Models;
using Affix.Persistence.DataModels;
using Afix.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Affix.Controllers
{
#if DEBUG || RELEASE
    [RestrictHost("dev.lachezargeorgiev.com")]
#endif    
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly AffixContext context;

        public SubscriptionsController(AffixContext context)
        {
            this.context = context;
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task <ActionResult> PutSubscription(SubscriptionModel subscriptionModel)
        {
            if (context.Subscription.FirstOrDefault(s => s.Email == subscriptionModel.Email) == null)
            {
                await context.AddAsync(new SubscriptionDataModel { Email = subscriptionModel.Email });
                await context.SaveChangesAsync();
            }

            return NoContent();
        }
    }
}
