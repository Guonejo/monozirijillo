const fs = require('fs');
const path = require('path');

const appName = 'Aprendiendo con Puertas';
const sourceDir = path.join(__dirname, 'dist', `${appName}-win32-x64`);

console.log('========================================');
console.log('Aplicación compilada exitosamente!');
console.log('========================================\n');

if (fs.existsSync(sourceDir)) {
    console.log(`✓ La aplicación está lista en:`);
    console.log(`  ${sourceDir}\n`);
    console.log('Esta carpeta contiene todos los archivos necesarios.');
    console.log('Puedes copiar toda la carpeta a otra computadora.\n');
    console.log('Para ejecutar, abre:');
    console.log(`  ${path.join(sourceDir, `${appName}.exe`)}\n`);
    console.log('NOTA: Si necesitas un solo archivo .exe, puedes usar:');
    console.log('  - WinRAR: Crear archivo autoextraíble');
    console.log('  - 7-Zip: Crear SFX (Self-Extracting Archive)');
    console.log('  - O simplemente comprimir la carpeta en un .zip');
} else {
    console.error(`ERROR: No se encontró la carpeta ${sourceDir}`);
    console.error('Ejecuta primero: npm run build-win');
    process.exit(1);
}
