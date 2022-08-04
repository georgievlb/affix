FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Affix.IdentityServer/Affix.IdentityServer.csproj", "Affix.IdentityServer/"]
RUN dotnet restore "Affix.IdentityServer/Affix.IdentityServer.csproj"
COPY . .
WORKDIR "/src/Affix.IdentityServer"
RUN dotnet build "Affix.IdentityServer.csproj" -c Local -o /app/build

FROM build AS publish
RUN dotnet publish "Affix.IdentityServer.csproj" -c Local -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Affix.IdentityServer.dll"]
