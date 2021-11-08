# Affix

## Local Deployment

1. Install the ASP.NET Core runtime for dotnet 6.
2. Create a Web Site in IIS pointing to this folder:
  - `Affix/Api/bin/$environment/net6.0/publish` // replace Local with Release for release build
3. In IIS manager, select the web site from above and add a binding to https port 5001.
4. Ensure the Application pool runs under a user with full administrative access to the folder from 1.
5. Run the `deploy` function from the `./deploy/local-deployment.ps1` script as an administrator and pass in the environment you wish to build the project in - Local for Debug and Release for Release:
   - open a powershell terminal in ./Affix/deploy as an administrator
   - run this command `. ./local-deployment.ps1` This will add the deploy function to your powershell session.
   - run this command `deploy -environment Local`
6. Browse the website at https://localhost:5001
7. Alternatively, use the *Local* publishing profile in Visual Studio.

## Deployment to Dev

The Development environment is located in Elastic Beanstalk. After each successful commit to the `dev` branch, the code will be deployed to the environment using GitHub actions. The workflow file is located in `./Affix/.github/workflows/dotnet.yml`