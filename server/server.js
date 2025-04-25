//punto de entrada del servidor

import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})


/*
Request llega → server.js inicia el servidor.

Express maneja la ruta (app.js) → Redirige a routes/inventory.js.

El controlador (inventory.js) interactúa con el modelo (Product.js).

Sequelize se comunica con PostgreSQL (config/db.js).
*/