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
COPY ["Api/Affix.csproj", "Api/"]
RUN dotnet restore "Api/Affix.csproj"
COPY . .
WORKDIR "/src/Api"
RUN dotnet build "Affix.csproj" -c Local -o /app/build

FROM build AS publish
RUN dotnet publish "Affix.csproj" -c Local -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://*:5005
ENV ASPNETCORE_ENVIRONMENT=Local
ENTRYPOINT ["dotnet", "Affix.dll"]
