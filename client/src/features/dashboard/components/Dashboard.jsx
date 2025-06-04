import "../styles/Dashboard.css";
import { LowStockProductsView } from "./LowStockProductsView";
import React from "react";
/* import "../styles/MovimientosTable.css"; */

// Componente de tabla de movimientos
export const MovimientosTable = ({ movimientos }) => {
    if (!Array.isArray(movimientos)) return <div>Error en los datos</div>;

    return (
        <div className="table-wrapper">
            <table className="movimientos-table">
                <thead className="table-header">
                    <tr>
                        <th className="table-head-cell">Producto ID</th>
                        <th className="table-head-cell">Sede Origen</th>
                        <th className="table-head-cell">Sede Destino</th>
                        <th className="table-head-cell">Cantidad</th>
                        <th className="table-head-cell">Tipo</th>
                        <th className="table-head-cell">Usuario ID</th>
                        <th className="table-head-cell">Fecha</th>
                        <th className="table-head-cell">Observaciones</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {movimientos && movimientos.length > 0 ? (
                        movimientos.map((mov) => (
                            <tr key={mov.id} className="table-row">
                                <td className="table-cell">{mov.producto_id}</td>
                                <td className="table-cell">{mov.sede_origen_id ?? "—"}</td>
                                <td className="table-cell">{mov.sede_destino_id ?? "—"}</td>
                                <td className="table-cell">{mov.cantidad}</td>
                                <td className="table-cell">{mov.tipo}</td>
                                <td className="table-cell">{mov.usuario_id}</td>
                                <td className="table-cell">{mov.fecha ? new Date(mov.fecha).toLocaleString() : "—"}</td>
                                <td className="table-cell">{mov.observaciones || "—"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-4">No hay movimientos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};



export const DashboardView = ({ movimientos, loading, error }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="dashboard-content">
                {/* Sección de movimientos */}
                <h2 className="mt-8 mb-4">Movimientos recientes</h2>
                {loading ? (
                    <div>Cargando movimientos...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <MovimientosTable movimientos={movimientos} />
                )}

                {/* Sección de productos con bajo stock */}
                <LowStockProductsView />
            </div>
        </div>
    );
};

