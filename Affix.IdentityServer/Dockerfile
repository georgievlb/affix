FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Affix.IdentityServer/Affix.IdentityServer.csproj", "Affix.IdentityServer/"]
RUN dotnet restore "Affix.IdentityServer/Affix.IdentityServer.csproj"
COPY . .
WORKDIR "/src/Affix.IdentityServer"
RUN dotnet build "Affix.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Affix.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://*:5001
ENV ASPNETCORE_ENVIRONMENT=Local
ENTRYPOINT ["dotnet", "Affix.IdentityServer.dll"]
