// Configuración de elementos
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const doors = document.querySelectorAll('.door-wrapper');
const modal = document.getElementById('item-modal');
const closeButton = document.querySelector('.close-button');
const itemIcon = document.getElementById('item-icon');
const itemName = document.getElementById('item-name');
const itemLetter = document.getElementById('item-letter');
const repeatButton = document.getElementById('repeat-button');

// Variable para guardar el item actual
let currentItem = null;

// Configuración de items y sus emojis
const items = {
    'Auto': { emoji: '🚗', letter: 'A' },
    'Elefante': { emoji: '🐘', letter: 'E' },
    'Isla': { emoji: '🏝️', letter: 'I' },
    'Oso': { emoji: '🐻', letter: 'O' },
    'Unicornio': { emoji: '🦄', letter: 'U' }
};

// AudioContext global (se inicializa después de la interacción del usuario)
let audioContext = null;

// Función para obtener o crear AudioContext
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Reanudar el contexto si está suspendido (requerido por algunos navegadores)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Verificar soporte de síntesis de voz
    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta la síntesis de voz. Algunas funciones pueden no funcionar correctamente.');
    }
});

// Botón de inicio
startButton.addEventListener('click', () => {
    // Inicializar AudioContext en la primera interacción
    getAudioContext();
    
    // Animación de salida
    welcomeScreen.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        // Reproducir sonido de inicio
        playSound('start');
    }, 500);
});

// Función para hablar
function speak(text) {
    if ('speechSynthesis' in window) {
        // Cancelar cualquier síntesis anterior
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9; // Velocidad ligeramente más lenta para niños
        utterance.pitch = 1.2; // Tono más agudo y amigable
        utterance.volume = 1;
        
        window.speechSynthesis.speak(utterance);
    }
}

// Función para generar sonidos con Web Audio API
function playSound(soundType) {
    const ctx = getAudioContext();
    
    let frequency = 200;
    let duration = 0.3;
    let waveType = 'sine';
    
    switch(soundType) {
        case 'auto':
            // Sonido de claxon
            frequency = 400;
            duration = 0.2;
            waveType = 'square';
            break;
        case 'elefante':
            // Sonido de trompeta de elefante
            frequency = 150;
            duration = 0.5;
            waveType = 'sawtooth';
            break;
        case 'isla':
            // Sonido de olas
            frequency = 100;
            duration = 1;
            waveType = 'sine';
            break;
        case 'oso':
            // Sonido de gruñido
            frequency = 80;
            duration = 0.4;
            waveType = 'sawtooth';
            break;
        case 'unicornio':
            // Sonido mágico/musical
            frequency = 523; // Do
            duration = 0.3;
            waveType = 'sine';
            break;
        case 'start':
            // Sonido de inicio
            frequency = 440;
            duration = 0.2;
            waveType = 'sine';
            break;
        case 'confirm':
            // Sonido de confirmación
            frequency = 600;
            duration = 0.15;
            waveType = 'sine';
            break;
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = waveType;
    
    // Envelope para suavizar el sonido
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
    
    // Para sonidos más complejos, creamos secuencias
    if (soundType === 'elefante') {
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            const now2 = ctx.currentTime;
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.value = 120;
            osc2.type = 'sawtooth';
            gain2.gain.setValueAtTime(0, now2);
            gain2.gain.linearRampToValueAtTime(0.3, now2 + 0.01);
            gain2.gain.exponentialRampToValueAtTime(0.01, now2 + 0.3);
            osc2.start(now2);
            osc2.stop(now2 + 0.3);
        }, 200);
    }
    
    if (soundType === 'isla') {
        // Crear efecto de olas con múltiples frecuencias
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const now3 = ctx.currentTime;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 100 + (i * 20);
                osc.type = 'sine';
                gain.gain.setValueAtTime(0, now3);
                gain.gain.linearRampToValueAtTime(0.2, now3 + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, now3 + 0.5);
                osc.start(now3);
                osc.stop(now3 + 0.5);
            }, i * 200);
        }
    }
    
    if (soundType === 'unicornio') {
        // Crear acorde musical mágico
        const notes = [523, 659, 784]; // Do, Mi, Sol
        notes.forEach((note, index) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const now4 = ctx.currentTime;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = note;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0, now4);
                gain.gain.linearRampToValueAtTime(0.2, now4 + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, now4 + 0.4);
                osc.start(now4);
                osc.stop(now4 + 0.4);
            }, index * 50);
        });
    }
}

// Función para obtener el texto de voz apropiado
function getVoiceText(item) {
    const texts = {
        'Auto': 'Dentro de la puerta hay un auto',
        'Elefante': 'Dentro de la puerta hay un elefante',
        'Isla': 'Dentro de la puerta hay una isla',
        'Oso': 'Dentro de la puerta hay un oso',
        'Unicornio': 'Dentro de la puerta hay un unicornio'
    };
    return texts[item] || `Dentro de la puerta hay un ${item}`;
}

// Event listeners para las puertas
doors.forEach(door => {
    door.addEventListener('click', () => {
        const item = door.getAttribute('data-item');
        const letter = door.getAttribute('data-letter');
        
        // Guardar el item actual
        currentItem = item;
        
        // Reproducir sonido de confirmación
        playSound('confirm');
        
        // Mostrar modal
        itemIcon.textContent = items[item].emoji;
        itemName.textContent = item;
        itemLetter.textContent = `Letra: ${letter}`;
        modal.classList.remove('hidden');
        
        // Reproducir sonido característico después de un pequeño delay
        setTimeout(() => {
            const soundType = item.toLowerCase();
            playSound(soundType);
        }, 200);
        
        // Animación de la puerta
        const doorElement = door.querySelector('.door');
        doorElement.style.animation = 'bounce 0.5s ease-in-out';
        setTimeout(() => {
            doorElement.style.animation = '';
        }, 500);
    });
});

// Botón de repetir
repeatButton.addEventListener('click', () => {
    if (currentItem) {
        // Solo decir el nombre del objeto
        speak(currentItem);
        const soundType = currentItem.toLowerCase();
        playSound(soundType);
    }
});

// Cerrar modal
closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    window.speechSynthesis.cancel();
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        window.speechSynthesis.cancel();
    }
});

// Agregar animación de fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

