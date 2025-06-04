//punto de entrada del servidor
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import jwt from 'jsonwebtoken';
import app from './app.js';
import 'dotenv/config';
import movimientosRoutes from './routes/movimiento.js';
import './models/Movimiento.js';
import { sequelize } from './config/db.js'; // Asegúrate de importar sequelize desde tu configuración de base de datos


const PORT = process.env.PORT || 4000;

// Sincronizar modelos con la base de datos
sequelize.sync(); // o sync({ alter: true }) solo para desarrollo

//crear servidor http
const server = createServer(app);

//configurar socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
});

//Middleware para auth del socket
io.use((socket, next) => {
    try {
         const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Acceso no autorizado'));
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userData = decoded;
        next();
    } catch (error) {
        next(new Error('Token inválido'));
    }
})

// Manejar conexiones
io.on('connection', (socket) => {
    console.log('Nueva conexión:', socket.id);
    
    // Registrar en la sede correspondiente
    socket.on('register-sede', (sedeId) => {
        if (socket.userData.sede_id !== sedeId) {
            return socket.disconnect(true);
        }
        
        socket.join(`sede:${sedeId}`);
        console.log(`Usuario ${socket.userData.id} registrado en sede ${sedeId}`);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});


//iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})

export { io };



/*
Request llega → server.js inicia el servidor.

Express maneja la ruta (app.js) → Redirige a routes/inventory.js.

El controlador (inventory.js) interactúa con el modelo (Product.js).

Sequelize se comunica con PostgreSQL (config/db.js).
*/



app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

app.use('/api/movimientos', movimientosRoutes);

app.listen(4000, () => {
  console.log('Servidor corriendo en puerto 4000');
});