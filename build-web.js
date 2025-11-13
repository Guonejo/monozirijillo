const fs = require('fs');
const path = require('path');

// Crear directorio build si no existe
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Archivos a copiar
const filesToCopy = [
    'index.html',
    'script.js',
    'styles.css'
];

// Copiar archivos
filesToCopy.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    const destPath = path.join(buildDir, file);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✓ Copiado: ${file}`);
    } else {
        console.warn(`⚠ No encontrado: ${file}`);
    }
});

console.log('\n✅ Build completado! Los archivos están en la carpeta "build"');

