import { Router } from "express";
import {
    getProducts,
    crearPeticionTraslado,
    getMisPeticiones,
    getPeticionesRecibidas,
    responsePeticion
} from "../controllers/peticionesController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.get("/products", verificarToken, getProducts); // Obtener productos disponibles para crear una petición de traslado
router.post("/crear-peticion", verificarToken, crearPeticionTraslado); // Crear una nueva petición de traslado y notificar a la sede destino
router.get("/mias", verificarToken, getMisPeticiones); // Peticiones enviadas
router.get("/recibidas", verificarToken, getPeticionesRecibidas); // Peticiones recibidas
router.patch("/responder/:id", verificarToken, responsePeticion); // Responder a una petición

export default router;