#!/bin/sh

/opt/mssql/bin/sqlservr & /app/affix/Affix.DB/setup.sh & sleep infinity & wait