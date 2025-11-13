# Instrucciones para Compilar el .exe

## Paso 1: Instalar Node.js

1. Descarga Node.js desde: https://nodejs.org/
2. Instala la versión LTS (recomendada)
3. Verifica la instalación abriendo PowerShell o CMD y ejecutando:
   ```
   node --version
   npm --version
   ```

## Paso 2: Instalar las Dependencias

Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará Electron y electron-builder necesarios para crear el .exe

## Paso 3: Probar la Aplicación (Opcional)

Antes de compilar, puedes probar la aplicación ejecutando:

```bash
npm start
```

## Paso 4: Compilar el .exe

Para crear el archivo ejecutable, ejecuta:

```bash
npm run build-win
```

El proceso puede tardar varios minutos la primera vez.

## Paso 5: Encontrar el .exe

Una vez completada la compilación, encontrarás el archivo .exe en:
```
dist/Aprendiendo con Puertas Setup X.X.X.exe
```

Este archivo puedes distribuirlo e instalarlo en cualquier computadora con Windows sin necesidad de internet.

## Nota sobre el Icono

Si quieres un icono personalizado para la aplicación:
1. Crea un archivo `icon.png` (256x256 píxeles) en la raíz del proyecto
2. O usa un convertidor online para crear `icon.ico` desde una imagen PNG

Si no proporcionas un icono, Electron usará uno por defecto.

