using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace Affix.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("AffixAPI")
            };

        public static IEnumerable<Client> Clients (IConfiguration Configuration) =>
            new Client[]
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
                // JavaScript Client
                new Client
                {
                    ClientId = "affix_client_spa",
                    ClientName = "Affix JS Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,

                    RedirectUris =           { Configuration.GetSection("IdentityServer").GetValue<string>("RedirectUri") },
                    PostLogoutRedirectUris = { Configuration.GetSection("IdentityServer").GetValue<string>("PostLogoutRedirectUris") },
                    AllowedCorsOrigins =     { Configuration.GetSection("IdentityServer").GetValue<string>("AllowedCorsOrigins") },
                    //AlwaysIncludeUserClaimsInIdToken = true,
                    //AlwaysSendClientClaims = true,
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