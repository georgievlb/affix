#!/bin/sh
set -e
echo "Attempting to migrate api database\n*******************************"

echo "Installing dotnet-ef"
dotnet tool install --global dotnet-ef

echo "Adding dotnet tools PATH variable for current session"
export PATH="$PATH:/root/.dotnet/tools"

echo "Connection string"
echo $1

echo "Environment variables"
printenv

echo "Migrating db"
dotnet-ef database update -c AffixContext -p ./Affix.API.csproj -v --connection "$1" 

echo "Successfully migrated api database\n*******************************"
