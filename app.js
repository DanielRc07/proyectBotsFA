const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mock data: Simulamos una fila de usuarios
const fila = [];


// Función para activar la fila a una hora específica
const activateFilaAtSpecificTime = (hour, minute) => {
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

    let delay = targetTime - now;
    if (delay < 0) {
        // Si la hora actual es mayor que la hora objetivo, programar la apertura para el próximo día
        targetTime.setDate(targetTime.getDate() + 1);
        delay = targetTime - now;
    }

    setTimeout(() => {
        // Reiniciar la fila al abrirse
        fila.length = 0;
        console.log('¡La fila está abierta ahora!');
        isActive = true;
    }, delay);
};


// Activar la fila a las 11:00 AM
activateFilaAtSpecificTime(1, 37);

// Ruta principal que muestra la posición del usuario en la fila
app.get('/', (req, res) => {
    // Obtenemos el ID de usuario de la consulta (si no se proporciona, se usa uno predeterminado)
    const userID = req.query.id || 1;

    // Si el usuario ya está en la fila, obtenemos su posición
    let position = fila.indexOf(userID);
    if (position === -1) {
        // Si el usuario no está en la fila, lo agregamos
        fila.push(userID);
        position = fila.length;
    }

    // Obtener la hora y el minuto de apertura
    const openingHour = 1; // Hora de apertura (ejemplo)
    const openingMinute = 35; // Minuto de apertura (ejemplo)

    res.render('index', { position, isActive, openingTime: `${openingHour}:${openingMinute < 10 ? '0' + openingMinute : openingMinute}` }); // Enviamos la hora de apertura como dato
});


app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// Variable para controlar si la fila está activa o no
let isActive = false;
