import {
    getProductsTransferUseCase,
    crearPeticionUseCase,
    notificarPeticionUseCase,
    getPeticionesUseCase
} from "../use_cases/peticiones/index.js";
import Movimiento from "../models/Movimiento.js";

//obtener productos
export const getProducts = async (req, res) => {
    try {
        const search = req.query.search || ""; // Extrae el término de búsqueda
        const sedeId = req.user?.sede_id || req.query.sede_id; //desde token o query param

        if (!sedeId) {
            return res.status(400).json({ error: 'sede_id es requerido' });
        }
        console.log("Buscando productos con:", { search, sedeId }); // Debug

        const productos = await getProductsTransferUseCase({ search, sedeId });
        res.json(productos);
    } catch (error) {
        console.log("Error al obtener productos:", error);
        res.status(500).json({
            error: 'Error al obtener productos',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

// Crear una petición de traslado
export const crearPeticionTraslado = async (req, res) => {
    try {
        const { producto_id, sede_origen_id, sede_destino_id, cantidad, observaciones } = req.body;

        // Validaciones básicas
        if (!producto_id || !sede_origen_id || !sede_destino_id || !cantidad) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        if (sede_origen_id === sede_destino_id) {
            return res.status(400).json({ error: 'La sede origen y destino no pueden ser iguales' });
        }

        const peticion = await crearPeticionUseCase({
            producto_id,
            sede_origen_id,
            sede_destino_id,
            cantidad,
            observaciones: observaciones || '',
            usuario_id: req.user.id // ID del usuario que solicita la petición
        });

        // Registrar el movimiento asociado a la petición
        await Movimiento.create({
            producto_id,
            sede_origen_id,
            sede_destino_id,
            cantidad,
            tipo: 'traslado',
            usuario_id: req.user.id,
            fecha: new Date(),
            observaciones: observaciones || ''
        });

        res.status(201).json({
            success: true,
            data: peticion,
            message: 'Petición creada y movimiento registrado correctamente'
        });
    } catch (error) {
        console.error("Error en crearPeticionTraslado:", error.message);

        const statusCode = error.message.includes('no existe') ||
            error.message.includes('mayor al inventario') ? 400 : 500;

        res.status(statusCode).json({
            error: error.message,
            detalles: 'Error al procesar la petición'
        });
    }
}

//Obtener peticiones de traslado hechas por el usuario
export const getMisPeticiones = async (req, res) => {

    try {
        const peticiones = await getPeticionesUseCase(
            req.user.id, // ID del usuario
            null,
            req.query.estado || null, // Estado de la petición (opcional)
        );

        res.json({
            success: true,
            count: peticiones.length,
            data: peticiones
        });

    } catch (error) {
        console.error("Error en getMisPeticiones:", error);
        res.status(500).json({
            error: 'Error al obtener tus peticiones',
            detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

//Obtener las peticiones de traslado recibidas por el usuario
export const getPeticionesRecibidas = async (req, res) => {

    try {
        const peticiones = await getPeticionesUseCase(
            null,         // usuarioId (no filtrar por usuario)
            req.user.sede_id, // sede_destino_id
            req.query.estado || 'pendiente', // estado (default: pendiente)
            'sede_destino_id' // Filtrar por sede destino
        );

        res.json({
            success: true,
            count: peticiones.length,
            data: peticiones
        });
    } catch (error) {
        console.error("Error en getPeticionesRecibidas:", error);
        res.status(500).json({
            error: 'Error al obtener peticiones recibidas',
            detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}