using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Affix
{
    public static class Config
    {
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                    new ApiScope("AffixAPI")
            };

        public static IEnumerable<Client> Clients(IConfiguration Configuration)
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "client1",

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("MySecret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = { "AffixAPI" }
                },

                new Client
                {
                    ClientId = "Auth",
                    ClientName = "SPA Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,

                    RedirectUris = { Configuration.GetSection("IdentityServer").GetValue<string>("RedirectUri") },
                    PostLogoutRedirectUris = { Configuration.GetSection("IdentityServer").GetValue<string>("PostLogoutRedirectUris") },
                    AllowedCorsOrigins = { Configuration.GetSection("IdentityServer").GetValue<string>("AllowedCorsOrigins") },
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AlwaysSendClientClaims = true,

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "AffixAPI"
                    }

                }
            };
        }
    }
}
