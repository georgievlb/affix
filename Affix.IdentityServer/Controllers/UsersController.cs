using Affix.IdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Duende.IdentityServer.IdentityServerConstants;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Affix.IdentityServer.Controllers
{
    public class MyModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    [Authorize(LocalApi.PolicyName)]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ILogger<UsersController> logger;

        public UsersController(UserManager<ApplicationUser> userManager, ILogger<UsersController> logger)
        {
            this.userManager = userManager;
            this.logger = logger;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(UsersController.Get)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(UsersController.GetById)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MyModel model)
        {
            try
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email, EmailConfirmed = true };
                var result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return Ok();
                }

                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(UsersController.Post)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
            finally
            {
                userManager.Dispose();
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(UsersController.Delete)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
