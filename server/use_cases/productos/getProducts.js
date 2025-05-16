import InventarioSede from "../../models/InventarioSede.js";
import Sede from "../../models/Sede.js";
import Producto from "../../models/Producto.js";
import { sequelize } from "../../config/db.js";


export const getProductsUseCase = async (sedeUsuario) => {

    const productos = await InventarioSede.findAll({
        where: sedeUsuario ? { sede_id: sedeUsuario } : {},
        include: [
            {
                model: Producto,
                as: "producto",
                required: true,// evita traer registros sin relación
            },
            {
                model: Sede,
                as: "sede"
            }
        ]
    });

    return productos;

}


