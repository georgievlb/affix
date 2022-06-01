using Affix.IdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Duende.IdentityServer.IdentityServerConstants;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Affix.IdentityServer.Controllers
{
    [Authorize(LocalApi.PolicyName)]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private RoleManager<IdentityRole> roleManager;
        private UserManager<ApplicationUser> userManager;
        private readonly ILogger<RolesController> logger;

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ILogger<RolesController> logger)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.logger = logger;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.Get)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.GetById)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoleAsync([FromBody] RoleModel role)
        {
            try
            {
                IdentityResult result = await roleManager.CreateAsync(new IdentityRole(role.Name));
                if (result.Succeeded)
                {
                    return Ok($"Successfully created role: {role.Name}");
                }

                return BadRequest($"The following error occured: {result.Errors}");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.CreateRoleAsync)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> AddUserToRole([FromBody] UserToRoleModel userToRole)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(userToRole.Email);
                if (user == null)
                {
                    return NotFound($"No user found with email: {userToRole.Email}.");
                }

                await userManager.AddToRoleAsync(user, userToRole.Role);

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.AddUserToRole)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.Put)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error calling {nameof(RolesController.Delete)}, {ex.Message}, {ex.StackTrace}, {ex.InnerException}.");

                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
