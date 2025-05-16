import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import '../styles/LowStockProducts.css';
import { useAuth } from "../../../contexts/AuthContext";

export const LowStockProductsView = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('todos');
    const [threshold, setThreshold] = useState('');


    const sedeId = {
        bello: 1,
        envigado: 2,
        sabaneta: 3,
    }[filtro];

    const handleThresholdChange = (e) => {
        const value = e.target.value;
        if (value === '' || (!isNaN(value) && parseInt(value) > 0)) {
            setThreshold(value);
        }
    };

    useEffect(() => {
        const getLowStockProducts = async () => {
            try {

                if (threshold && filtro !== "todos") {
                    const res = await axiosInstance.get('/products/low-stock', {
                        params: { sede_id: sedeId, threshold },
                    });
                    setProductos(res.data);
                } else {
                    setProductos([]);
                    setLoading(false);
                }

            } catch (error) {
                setError("Error al cargar productos con bajo stock.");
            } finally {
                setLoading(false);
            }
        }

        getLowStockProducts();

    }, [filtro, threshold]);



    return (
        <div className="low-stock-container">
            <h2 className="low-stock-title">{threshold ? ` Productos con stock menor que ${threshold}` : 'Filtrar por stock mínimo'}</h2>
            {/* Filtros */}
            <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="filter-select"
            >
                <option value="todos">Seleccione una sede</option>
                <option value="bello">Ver productos de Bello</option>
                <option value="sabaneta">Ver productos de Sabaneta</option>
                <option value="envigado">Ver productos de Envigado</option>
            </select>
            <input
                type="number"
                min="1"
                value={threshold}
                onChange={handleThresholdChange}
                className="filter-select"
                placeholder="Stock mínimo"
            />

            {loading ? (
                <p className="loading">Cargando productos...</p>
            ) : error ? (
                <p className="loading">{error}</p>
            ) : filtro !== 'todos' && threshold ? (
                productos.length === 0 ? (
                    <p className="loading">No hay productos con bajo stock.</p>
                ) : (
                    <div className="table-wrapper">
                        <table className="low-stock-table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-head-cell">ID</th>
                                    <th className="table-head-cell">Nombre</th>
                                    <th className="table-head-cell">Referencia</th>
                                    <th className="table-head-cell">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod) => (
                                    <tr className="table-row" key={prod.producto.id}>
                                        <td className="table-cell">{prod.producto.id}</td>
                                        <td className="table-cell">{prod.producto.nombre}</td>
                                        <td className="table-cell">{prod.producto.referencia}</td>
                                        <td className="table-cell stock-cell">{prod.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <p className="info">Ingrese un valor mínimo y seleccione una sede</p>
            )}
        </div>
    );
}
