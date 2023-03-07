#!/bin/sh

/root/.dotnet/tools/dotnet-ef database update -c AffixContext -p /app/affix/Affix.API/Affix.API.csproj -v --connection "Server=db,1433;Database=Affix;User=sa;Password=P@ssword1;MultipleActiveResultSets=true" & \
/root/.dotnet/tools/dotnet-ef database update -c AffixIdentityContext -p /app/affix/Affix.IdentityServer/Affix.IdentityServer.csproj -v --connection "Server=db,1433;Database=AffixIdentity;User=sa;Password=P@ssword1;MultipleActiveResultSets=true"
