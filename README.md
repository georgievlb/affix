# Affix

## Local Deployment

To deploy the application locally:
1. Create a new Web Site in IIS with the following physical path:
    `.\Affix\Api\bin\Local\net6.0\publish` // replace Local with Release for release build
2. In IIS manager, select the web site from above and add a binding to https port 5001.
3. Ensure that web site application pool is logged in as a user that has administrative rights.
3. Run the deploy function from the `./deploy/local-deployment.ps1` script as an administrator and pass in the environment you wish to build the project in - Local for Debug and Release for Release:
    - `. .\local-deployment.ps1`
	- `deploy -environment Local`
4. Alternatively, use the *Local* publishing profile in Visual Studio.