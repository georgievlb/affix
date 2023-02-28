#!/bin/sh

echo "Determining os release:" >> /var/log/dbmigration.log
cat /etc/os-release

echo "Attempting to add a new entry to /etc/apt/sources.list" >> /var/log/dbmigration.log
echo deb http://debian.org/debian stretch main >> /etc/apt/sources.list

echo "Attempting to install curl"
apt install curl

echo "Attempting to download the dotnet-install script" >> /var/log/dbmigration.log
curl -L https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh

chmod 744 dotnet-install.sh

echo "Attempting to Install dotnet 6 sdk" >> /var/log/dbmigration.log
./dotnet-install.sh -c 6.0

echo "Attempting to install dotnet-ef" >> /var/log/dbmigration.log
dotnet tool install --global dotnet-ef

echo "Successfully migrated database" >> /var/log/dbmigration.log