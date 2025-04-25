import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { ProductosView } from "../components/pages/ProductosSede.jsx";
import { ProductosTotalesView } from "../components/pages/ProductosTotales.jsx";

export const ProductosContainer = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('bello');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      setLoading(true);
      try {
        let url = filtro === 'todos' ? '/products/total' : '/products';
        
        if (filtro !== 'todos') {
          const sedeId = {
            bello: 1,
            sabaneta: 3,
            envigado: 2
          }[filtro];
          
          url += `?sede_id=${sedeId}`;
        }

        const res = await axiosInstance.get(url);
        setProductos(res.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [filtro]);
  return (
    <div className="productos-container">
      <h1 className="productos-title">Inventario de Productos</h1>
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filter-select"
      >
        <option value="todos">Ver todos los productos (suma total)</option>
        <option value="bello">Ver productos de Bello</option>
        <option value="sabaneta">Ver productos de Sabaneta</option>
        <option value="envigado">Ver productos de Envigado</option>
      </select>

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : filtro === 'todos' ? (
        <ProductosTotalesView productos={productos} />
      ) : (
        <ProductosView productos={productos} sede={filtro} />
      )}
    </div>
  );
}