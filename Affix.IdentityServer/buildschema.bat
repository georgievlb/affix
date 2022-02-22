rmdir /S /Q "Data/Migrations"

dotnet ef migrations add Users -c AffixIdentityContext -o Data/Migrations
