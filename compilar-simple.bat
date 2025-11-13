@echo off
cd /d "%~dp0"
echo ========================================
echo Compilando con electron-packager (mas simple)...
echo ========================================
echo.
if not exist "package.json" (
    echo ERROR: No se encontro package.json
    pause
    exit /b 1
)
echo Limpiando dist...
if exist "dist" (
    rmdir /s /q "dist" 2>nul
)
echo.
echo Instalando electron-packager si no esta instalado...
call npm install electron-packager --save-dev --silent
echo.
echo Compilando...
call npx electron-packager . "Aprendiendo con Puertas" --platform=win32 --arch=x64 --out=dist --overwrite --asar
echo.
if exist "dist\Aprendiendo con Puertas-win32-x64\Aprendiendo con Puertas.exe" (
    echo ========================================
    echo Compilacion completada!
    echo ========================================
    echo.
    echo La aplicacion se encuentra en: dist\Aprendiendo con Puertas-win32-x64\
    echo.
    echo NOTA: Esta carpeta contiene todos los archivos necesarios.
    echo Puedes copiar toda la carpeta a otra computadora.
    echo.
) else (
    echo ERROR: No se pudo compilar.
)
pause

