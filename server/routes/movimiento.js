import { Router } from "express";
import Movimiento from "../models/Movimiento.js";

const router = Router();

// GET /api/movimientos
// Devuelve todos los movimientos de la base de datos
router.get("/", async (req, res) => {
  try {
    const movimientos = await Movimiento.findAll(); // Busca todos los movimientos
    res.json(movimientos); // Devuelve los movimientos en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener movimientos" }); // Manejo de errores
  }
});

export default router;