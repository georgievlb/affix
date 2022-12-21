# Affix

Affix is a blog application built with .NET 6 and Angular 12. The app is containerized using Docker. Docker compose is used for orchestration when developing locally.

## Local Dev

1. Install Docker Desktop for the OS you're using.
2. Trust / Import PFX files in Affix.ReverseProxy:
   1. api-local.pfx
   2. client-local.pfx
   3. is-local.pfx
3. Add host entries:
   1. For Mac/Linux: `/etc/hosts`
   2. For Windows: `C:\Windows\system32\driver\etc\hosts`
```
127.0.0.1   local.is.affix.com
127.0.0.1   local.api.affix.com
127.0.0.1   local.client.affix.com
```
4. Run the project using docker compose.
