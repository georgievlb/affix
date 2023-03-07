FROM mcr.microsoft.com/mssql/server:2019-latest

# Accept the EULA
ENV ACCEPT_EULA=Y

# Set the SA password
ENV SA_PASSWORD=P@ssword1

# Set the product ID
ENV MSSQL_PID=Developer

# Install the .NET Core runtime
USER root
RUN apt-get -y update
RUN mkdir /opt/dotnet-runtime && wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O /opt/dotnet-runtime/packages-microsoft-prod.deb \
    && dpkg -i /opt/dotnet-runtime/packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y dotnet-sdk-6.0
#RUN wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
#sudo dpkg -i packages-microsoft-prod.deb \
#rm packages-microsoft-prod.deb

# Create a new directory for the Affix project
RUN mkdir -p /app/affix

# Copy the Affix project files to the new directory
COPY . /app/affix

# Change the current working directory to the new directory
WORKDIR /app/affix

# Run the database update command
RUN dotnet tool install --global dotnet-ef --version 6.0 && export PATH="$HOME/.dotnet/tools/"

RUN chmod -R 744 /app/affix/Affix.DB
ENV ASPNETCORE_ENVIRONMENT=Local
CMD ["/bin/bash", "Affix.DB/entrypoint.sh"]
#This Dockerfile is based on the mcr.microsoft.com/mssql/server:2019-latest image, which is the latest version of the Microsoft SQL Server 2019 image. It sets the required environment variables ACCEPT_EULA and SA_PASSWORD, and installs the .NET Core runtime using apt-get.
#
#The Dockerfile then creates a new directory for the Affix project, copies the project files to the new directory, and changes the current working directory to the new directory. Finally, it runs the dotnet ef database update command to update the database.
#
#Note: This implementation assumes that the project files are located in the root directory of the project and that the Affix.API.csproj file is located in the Affix.API subdirectory. It also assumes that the dotnet ef tool is installed and available on the system.