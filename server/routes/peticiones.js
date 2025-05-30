import { Router } from "express";
import {
    getProducts,
    crearPeticionTraslado,
    getMisPeticiones,
    getPeticionesRecibidas
} from "../controllers/peticionesController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.get("/products", verificarToken, getProducts);
router.post("/crear-peticion", verificarToken, crearPeticionTraslado);
router.get("/mias", verificarToken, getMisPeticiones); // Peticiones enviadas
router.get("/recibidas", verificarToken, getPeticionesRecibidas); // Peticiones recibidas

export default router;