# Affix

## Local Deployment

1. Install the ASP.NET Core runtime for dotnet 6.
2. Create a Web Site in IIS pointing to this folder:
  - Affix/Api/bin/$environment/net6.0/publish
3. Add an https binding to port 5001.
4. Ensure the Application pool runs under a user with full access rights on the folder from 1.
5. Run the ./deploy/local-deployment.ps1 script as follows:
   - open a powershell terminal in ./Affix/deploy as an administrator
   - run this command `. ./local-deployment.ps1` This will add the deploy function to your powershell session.
   - run this command `deploy -environment Local`
6. Browse the website at https://localhost:5001


## Deployment to Dev

The Development environment is located in Elastic Beanstalk. After each successful commit to the `dev` branch, the code will be deployed to the environment using GitHub actions. The workflow file is located in `./Affix/.github/workflows/dotnet.yml`