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
                new ApiScope("AffixAPI"),
                new ApiScope(IdentityServerConstants.LocalApi.ScopeName)
            };

        public static IEnumerable<Client> Clients(IConfiguration Configuration) =>
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
                new Client
                {
                    ClientId = "client2",

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("MySecret2".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = { IdentityServerConstants.LocalApi.ScopeName }
                },
                // TODO: Remove- Obsolete
                // JavaScript Client
                //new Client
                //{
                //    ClientId = "affix_client_spa2",
                //    ClientName = "Affix JS Client2",
                //    AllowedGrantTypes = GrantTypes.Code,
                //    RequireClientSecret = false,

                //    RedirectUris =           { Configuration.GetSection("IdentityServer").GetValue<string>("RedirectUri2") },
                //    PostLogoutRedirectUris = { Configuration.GetSection("IdentityServer").GetValue<string>("PostLogoutRedirectUris2") },
                //    AllowedCorsOrigins =     { Configuration.GetSection("IdentityServer").GetValue<string>("AllowedCorsOrigins2") },
                //    //AlwaysIncludeUserClaimsInIdToken = true,
                //    //AlwaysSendClientClaims = true,
                //    AllowedScopes =
                //    {
                //        IdentityServerConstants.StandardScopes.OpenId,
                //        IdentityServerConstants.StandardScopes.Profile,
                //        "AffixAPI"
                //    }
                //},
                // Affix application hosted on ASP.NET Core
                new Client
                {
                    ClientId = Configuration.GetSection("IdentityServer").GetValue<string>("ClientId"),
                    ClientName = Configuration.GetSection("IdentityServer").GetValue<string>("ClientName"),
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