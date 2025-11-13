@echo off
cd /d "%~dp0"
echo ========================================
echo Instalando dependencias...
echo ========================================
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo instalar las dependencias.
    echo Asegurate de tener Node.js instalado.
    echo Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
echo.
echo ========================================
echo Instalacion completada!
echo ========================================
echo.
echo Para probar la aplicacion, ejecuta: npm start
echo Para compilar el .exe, ejecuta: npm run build-win
echo.
pause

