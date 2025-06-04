import Movimiento from "../../models/Movimiento.js";

export const getMovimientosUseCase = async () => {
  // Trae todos los movimientos ordenados por fecha de creación descendente
  return await Movimiento.findAll({ order: [['createdAt', 'DESC']] });
};

export const createMovimientoUseCase = async (data) => {
  // Inserta un nuevo movimiento en la base de datos
  return await Movimiento.create(data);
};