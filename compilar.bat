@echo off
cd /d "%~dp0"
echo ========================================
echo Verificando ubicacion...
echo ========================================
if not exist "package.json" (
    echo ERROR: No se encontro package.json
    echo Asegurate de ejecutar este script desde la raiz del proyecto.
    pause
    exit /b 1
)
echo.
echo ========================================
echo Limpiando archivos anteriores...
echo ========================================
if exist "dist" (
    rmdir /s /q "dist" 2>nul
    echo Carpeta dist limpiada.
)
if exist "%LOCALAPPDATA%\electron-builder\Cache" (
    rmdir /s /q "%LOCALAPPDATA%\electron-builder\Cache" 2>nul
    echo Cache limpiado.
)
echo.
echo ========================================
echo Compilando aplicacion...
echo ========================================
echo.
echo Paso 1: Creando aplicacion con electron-packager...
echo Esto puede tardar varios minutos...
echo.
call npm run build-win
if %errorlevel% neq 0 (
    echo.
    echo ERROR en el paso 1.
    pause
    exit /b 1
)
echo.
echo Paso 2: Empaquetando en un solo .exe...
echo.
call npm run package-exe
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo compilar la aplicacion.
    echo Asegurate de haber ejecutado primero: npm install
    pause
    exit /b 1
)
echo.
echo ========================================
echo Compilacion completada!
echo ========================================
echo.
echo La aplicacion se encuentra en: dist\Aprendiendo con Puertas-win32-x64\
echo.
echo Para ejecutar, abre: dist\Aprendiendo con Puertas-win32-x64\Aprendiendo con Puertas.exe
echo.
echo Puedes copiar toda la carpeta a otra computadora.
echo.
echo NOTA: Si necesitas un solo archivo .exe, puedes usar WinRAR o 7-Zip
echo para crear un archivo autoextraible desde la carpeta.
echo.
echo Puedes ejecutar este archivo directamente o copiarlo a otra computadora.
echo.
pause

