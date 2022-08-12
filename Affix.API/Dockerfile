FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY Affix.ReverseProxy/is-local.crt /usr/local/share/ca-certificates/is-local.crt
RUN update-ca-certificates
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["Affix.API/Affix.API.csproj", "Affix.API/"]
RUN dotnet restore "Affix.API/Affix.API.csproj"
COPY . .
WORKDIR "/src/Affix.API"
RUN dotnet build "Affix.API.csproj" -c Debug -o /app/build

FROM build AS publish
RUN dotnet publish "Affix.API.csproj" -c Debug -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Affix.API.dll"]
