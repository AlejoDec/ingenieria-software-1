import "../styles/Dashboard.css";
import { LowStockProductsView } from "./LowStockProductsView";
import {MovimientosContainer} from "../containers/MovimientosContainer.jsx";


export const DashboardView = ({  }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="dashboard-content">
                <h1 className="text-2xl font-bold mb-4">Dashboard de Sedes</h1>
                {/* Sección de movimientos */}
                <MovimientosContainer />
                {/* Sección de productos con bajo stock */}
                <LowStockProductsView />

                
            </div>
        </div>
    );
}
// Ejemplo de datos de prueba
/* const movimientosEjemplo = [
    {
        id: 1,
        producto_id: 101,
        sede_origen_id: 1,
        sede_destino_id: 2,
        cantidad: 10,
        tipo: "traslado",
        usuario_id: 5,
        fecha: "2024-05-31T10:00:00Z",
        observaciones: "Traslado urgente"
    },
    {
        id: 2,
        producto_id: 102,
        sede_origen_id: null,
        sede_destino_id: 1,
        cantidad: 20,
        tipo: "entrada",
        usuario_id: 3,
        fecha: "2024-05-30T15:30:00Z",
        observaciones: ""
    }
]; */
