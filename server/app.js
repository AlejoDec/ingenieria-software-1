//config principal de express
import express from 'express';
import cors from 'cors';
import inventoryRoutes from './routes/inventory.js';
import auth from './routes/auth.js';
import { testConnection, sequelize } from './config/db.js';
import {Producto, Movimiento, Usuario, InventarioSede, Sede} from "./models/index.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use('/api/products', inventoryRoutes);
app.use('/api',auth);

//ruta de prueba
app.get('/', (reg, res) => {
    res.send("Api inventario funcionando")
})

//conexión DB
const startServer = async() => {
    await testConnection();
    await sequelize.sync({alter: true}) //crea la tabla si no existe y borra y sobreescribe si existe
        .then(() => console.log('tablas creadas'))
        .catch((error) => console.error('Error al crear tablas:', error))
}

startServer();

export default app;

