import { getMovimientosUseCase, createMovimientoUseCase } from '../use_cases/dashboard/getMovimientos.js';

// Obtener todos los movimientos
export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await getMovimientosUseCase();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo movimiento
export const createMovimiento = async (req, res) => {
  try {
    const nuevoMovimiento = await createMovimientoUseCase(req.body);
    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};