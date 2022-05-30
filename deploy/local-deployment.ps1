#Requires -RunAsAdministrator

Function deploy {
    Param(
        [Parameter (Mandatory = $true)] [String]$environment)
    $configuration = "Debug"
    if ( ($environment -eq "Production") -or ($environment -eq "Staging") ) {$configuration = "Release"}
    Write-Host "Deploying to $environment with configuration $configuration"
    iisreset.exe /stop
    dotnet publish ../Api/Affix.csproj -c $environment -f 'net6.0' -r win-x64 -o "../Api/bin/$environment/net6.0/publish" -c $configuration
    dotnet publish ../Affix.IdentityServer/Affix.IdentityServer.csproj -c $environment -f 'net6.0' -r win-x64 -o "../Affix.IdentityServer/bin/$environment/net6.0/publish" -c $configuration
    iisreset.exe /start
}