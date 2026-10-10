Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = "c:\Amal\Ideatex-Website\cpanel-deploy"
$zipPath = "c:\Amal\Ideatex-Website\ideatex-cpanel-build.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Creating zip from $sourceDir to $zipPath..."
[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$file = Get-Item $zipPath
$sizeMB = [math]::Round($file.Length / 1MB, 2)
Write-Host "Zip successfully created: $zipPath ($sizeMB MB)"
