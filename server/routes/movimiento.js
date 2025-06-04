import express from 'express';
import { getMovimientos, createMovimiento } from '../controllers/movimientosController.js';

const router = express.Router();

// GET /api/movimientos
// Devuelve todos los movimientos de la base de datos
router.get('/', getMovimientos);

// POST /api/movimientos
// Crea un nuevo movimiento en la base de datos
router.post('/', createMovimiento);

export default router;
