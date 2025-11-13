const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Crear la ventana del navegador
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        icon: path.join(__dirname, 'icon.png'),
        title: 'Aprendiendo con Puertas',
        backgroundColor: '#667eea'
    });

    // Cargar el archivo index.html
    mainWindow.loadFile('index.html');

    // Abrir las herramientas de desarrollo (opcional, comentar en producción)
    // mainWindow.webContents.openDevTools();

    // Cuando se cierra la ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Maximizar la ventana al iniciar
    mainWindow.maximize();
}

// Este método se ejecutará cuando Electron haya terminado de inicializarse
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // En macOS es común recrear una ventana cuando se hace clic en el icono
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Salir cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
    // En macOS, las aplicaciones normalmente se mantienen activas hasta que el usuario cierra explícitamente
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

