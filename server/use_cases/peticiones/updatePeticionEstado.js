import Movimiento from "../../models/Movimiento.js";
import PeticionTraslado from "../../models/PeticionTraslado.js";
import InventarioSede from "../../models/InventarioSede.js";
import { sequelize } from "../../config/db.js";

/**
 * Responde una petición de traslado, aceptándola o rechazándola.
 * 
 * @param {Object} params
 * @param {number} params.peticionId - ID de la petición.
 * @param {'aceptar'|'rechazar'} params.respuesta - Acción a tomar.
 * @param {number} params.usuarioId - ID del usuario autenticado.
 * @param {number} params.sedeIdUsuario - Sede del usuario autenticado.
 * @param {string} [params.observaciones] - Observaciones opcionales.
 */

export const updatePeticionEstadoUseCase = async (peticionId, respuesta, usuarioId, sedeIdUsuario, observaciones = null) => {

    const transaction = await sequelize.transaction();
    try {
        // 1. Obtener la petición
        const peticion = await PeticionTraslado.findByPk(peticionId, {
            transaction
        });

        if (!peticion) throw new Error('Petición no encontrada');
    } catch (error) {

    }

}