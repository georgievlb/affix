#Requires -RunAsAdministrator

Function deploy {
    Param(
        [Parameter (Mandatory = $true)] [String]$environment)
    iisreset.exe /stop
    dotnet publish ../Api/Affix.csproj -c $environment -f 'net6.0' -r win-x64 -o "../Api/bin/$environment/net6.0/publish" -c 'Release'
    iisreset.exe /start
}
