#!/bin/sh

# Wait for SQL Server to be started and then run the sql script
/app/affix/Affix.DB/wait-for-it.sh db:1433 --timeout=0 --strict -- sleep 5s & \
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" & \
/app/affix/Affix.DB/migrate-app-database.sh