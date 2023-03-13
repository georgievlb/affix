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

## Deployment to the Development environment

*Affix* can be easily deployed to AWS using CloudFormation. Whenever possible, resources from the AWS Free Tier are used. Note that some resources, such as a registered domain name, aren't included in the free tier and you're required to pay a respective fee.

To deploy *Affix* to AWS, follow the steps below:

1. Build the individual docker images for publishing:
   - `docker build -f ./Affix.API/Dockerfile-Development -t DOCKER_ID/affix_api:latest .`
   - `docker build -f ./Affix.IdentityServer/Dockerfile -t DOCKER_ID/affix_is:latest  . `
   - `docker build -f ./Affix.IdentityServer/Dockerfile-db -t DOCKER_ID/affix_is_db_migrate:latest .`
   - `docker build -f ./Affix.API/Dockerfile-db -t DOCKER_ID/affix_api_db_migrate:latest .`
   - `docker build -f ./Affix.Client/Dockerfile-Development -t DOCKER_ID/affix_client:latest .`

2. Publish the docker images to a docker container registry:
   - `docker push DOCKER_ID/affix_api`
   - `docker push DOCKER_ID/affix_is`
   - `docker push DOCKER_ID/affix_is_db_migrate`
   - `docker push DOCKER_ID/affix_api_db_migrate`
   - `docker push DOCKER_ID/affix_client`

*Note: in the commands above, `DOCKER_ID` stands for a docker id in Docker Hub. You can use any container registry of your choice. For example, you can use a private container registry such as AWS Elastic Container Registry. Applicable fees may apply for each individual container registry.*