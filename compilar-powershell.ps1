# Script de PowerShell para compilar la aplicación
# Ejecutar desde la raíz del proyecto (donde está package.json)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Limpiando cache anterior..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Limpiar caché de electron-builder
$cachePath = "$env:LOCALAPPDATA\electron-builder\Cache"
if (Test-Path $cachePath) {
    Remove-Item -Recurse -Force $cachePath -ErrorAction SilentlyContinue
    Write-Host "Cache limpiado." -ForegroundColor Green
} else {
    Write-Host "No hay cache para limpiar." -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Compilando aplicacion a .exe..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Esto puede tardar varios minutos..." -ForegroundColor Yellow
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: No se encontro package.json" -ForegroundColor Red
    Write-Host "Asegurate de ejecutar este script desde la raiz del proyecto." -ForegroundColor Red
    pause
    exit 1
}

# Compilar
npm run build-win

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: No se pudo compilar la aplicacion." -ForegroundColor Red
    Write-Host "Asegurate de haber ejecutado primero: npm install" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Compilacion completada!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "El archivo .exe se encuentra en la carpeta: dist\" -ForegroundColor Cyan
Write-Host ""
pause

