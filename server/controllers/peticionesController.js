import { getProductsTransferUseCase } from "../use_cases/peticiones/getProducts.js";

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