FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS baseserver
WORKDIR /app
COPY Affix.ReverseProxy/is-local.crt /usr/local/share/ca-certificates/is-local.crt
COPY Affix.ReverseProxy/api-local.crt /usr/local/share/ca-certificates/api-local.crt
RUN update-ca-certificates


FROM node:14-alpine3.15 as base
WORKDIR /app
COPY ./Affix.Client/Client .
WORKDIR /app/Affix.Client/Client
RUN npm install

FROM base as build
WORKDIR /app
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS buildserver
WORKDIR /src
COPY ["Affix.Client/Affix.Client.csproj", "Affix.Client/"]
RUN dotnet restore "Affix.Client/Affix.Client.csproj"
COPY . .
WORKDIR "/src/Affix.Client"
RUN dotnet build "Affix.Client.csproj" -c Debug -o /app/buildserver

FROM buildserver as publishserver
RUN dotnet publish "Affix.Client.csproj" -c Debug -o /app/publishserver

FROM baseserver AS final
WORKDIR /app
COPY --from=publishserver /app/publishserver .
COPY --from=build /app/dist ./wwwroot
ENV ASPNETCORE_URLS=http://*:5555
ENV ASPNETCORE_ENVIRONMENT=Local
ENTRYPOINT ["dotnet", "Affix.Client.dll"]

#FROM build as final
#WORKDIR /app
#COPY --from=build /app/dist 
#
#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["Affix.UI/Affix.UI.csproj", "Affix.UI/"]
#RUN dotnet restore "Affix.UI/Affix.UI.csproj"
#COPY . .
#WORKDIR "/src/Affix.UI"
#RUN dotnet build "Affix.UI.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "Affix.UI.csproj" -c Release -o /app/publish
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Affix.UI.dll"]
