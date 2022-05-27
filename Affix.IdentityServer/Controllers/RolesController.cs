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

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoleAsync([FromBody] RoleModel role)
        {
            IdentityResult result = await roleManager.CreateAsync(new IdentityRole(role.Name));
            if (result.Succeeded)
            {
                return Ok($"Successfully created role: {role.Name}");
            }

            return BadRequest($"The following error occured: {result.Errors}");
        }

        [HttpPut]
        public async Task<IActionResult> AddUserToRole([FromBody] UserToRoleModel userToRole)
        {
            var user = await userManager.FindByEmailAsync(userToRole.Email);
            if (user == null)
            {
                return NotFound($"No user found with email: {userToRole.Email}.");
            }

            await userManager.AddToRoleAsync(user, userToRole.Role);
            return Ok();
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
