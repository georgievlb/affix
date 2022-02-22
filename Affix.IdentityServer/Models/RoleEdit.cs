using Microsoft.AspNetCore.Identity;

namespace Affix.IdentityServer.Models
{
    public class RoleEditModel
    {
        public IdentityRole Role { get; set; }

        public IEnumerable<ApplicationUser> Members { get; set; }

        public IEnumerable<ApplicationUser> NonMembers { get; set; }


    }
}
