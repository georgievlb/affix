# Use the latest version of the .NET core runtime image as the base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

# Create the working directory
WORKDIR /app

# Use the latest version of the .NET core SDK image as the build image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Create the working directory
WORKDIR /src

# Copy the project file and restore the dependencies
COPY ["Affix.IdentityServer/Affix.IdentityServer.csproj", "Affix.IdentityServer/"]
RUN dotnet restore "Affix.IdentityServer/Affix.IdentityServer.csproj"

# Copy the rest of the source code and change the working directory
COPY . .
WORKDIR "/src/Affix.IdentityServer"

# Build the project in release mode and output the result to the /app/build directory
RUN dotnet build "Affix.IdentityServer.csproj" -c Local -o /app/build

# Use the build image as the publish image
FROM build AS publish

# Publish the project in release mode and output the result to the /app/publish directory
RUN dotnet publish "Affix.IdentityServer.csproj" -c Local -o /app/publish

# Use the base image as the final image
FROM base AS final

# Create the working directory
WORKDIR /app

# Copy the published files from the publish image
COPY --from=publish /app/publish .

# Set the entrypoint for the final image
ENTRYPOINT ["dotnet", "Affix.IdentityServer.dll"]
