using Duende.IdentityServer;
using Duende.IdentityServer.Models;
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

        public static IEnumerable<Client> Clients =>
            new List<Client>
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

                    RedirectUris = { "https://localhost:5002/authentication/login-callback" },
                    PostLogoutRedirectUris = { "https://localhost:5002/authentication/logout-callback" },
                    AllowedCorsOrigins = { "https://localhost:5002" },
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
