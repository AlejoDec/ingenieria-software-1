import { Router } from "express";
import { getProducts } from "../controllers/peticionesController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.get("/products", verificarToken, getProducts);

export default router;