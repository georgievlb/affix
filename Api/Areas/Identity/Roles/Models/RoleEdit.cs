using Affix.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Affix.Areas.Identity.Models
{
    public class RoleEditModel
    {
        public IdentityRole Role { get; set; }

        public IEnumerable<ApplicationUser> Members { get; set; }

        public IEnumerable<ApplicationUser> NonMembers { get; set; }


    }
}
