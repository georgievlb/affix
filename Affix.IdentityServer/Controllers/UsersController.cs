using Affix.IdentityServer.Models;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Duende.IdentityServer.IdentityServerConstants;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Affix.IdentityServer.Controllers
{
    public class MyModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class MyClaimModel
    {
        public int Id { get; set; }

        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }
    }

    public class MyClaimModelWrapper
    {
        public string UserId { get; set; }

        public IEnumerable<MyClaimModel> Claims { get; set; }
    }

    [Authorize(LocalApi.PolicyName)]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MyModel model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email, EmailConfirmed = true };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        // PUT api/<UserController>/5
        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] MyClaimModelWrapper claimModelWrapper)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(claimModelWrapper.UserId);
                if (user == null)
                {
                    return BadRequest($"User with id{claimModelWrapper.UserId}, not found.");
                }

                var claims = new List<Claim>();
                foreach (var claimModel in claimModelWrapper.Claims)
                {
                    claims.Add(new Claim(claimModel.ClaimType, claimModel.ClaimValue));
                }
                var result = await _userManager.AddClaimsAsync(user, claims);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}: {ex.InnerException.Message}");
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
