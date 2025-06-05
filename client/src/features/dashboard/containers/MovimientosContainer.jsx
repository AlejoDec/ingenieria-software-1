import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { MovimientosView } from '../components/MovimientosView.jsx';
import { useDebounce } from '../../../components/hooks/useDebounce.jsx';

export const MovimientosContainer = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        producto: '',
        sede: '',
        fechaInicio: '',
        fechaFin: ''
    });

    // Usamos debounce para evitar muchas llamadas al API mientras se escribe
    const debouncedProducto = useDebounce(filtros.producto, 500);
    const debouncedSede = useDebounce(filtros.sede, 500);

    const fetchMovimientos = async () => {
        try {
            setLoading(true);
            const params = {
                producto_nombre: debouncedProducto || undefined,
                sede_nombre: debouncedSede || undefined,
                fecha_inicio: filtros.fechaInicio || undefined,
                fecha_fin: filtros.fechaFin || undefined
            };

            const response = await axiosInstance.get('/peticiones/movimientos', { params });
            setMovimientos(response.data.data || []);
            setError(null);
            // Debug: verifica los datos recibidos
            console.log('Datos recibidos:', response.data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Error al cargar movimientos');
            setMovimientos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovimientos();
    }, [debouncedProducto, debouncedSede, filtros.fechaInicio, filtros.fechaFin]);

    const handleFilterChange = (name, value) => {
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const handleResetFilters = () => {
    setFiltros({
      producto: '',
      sede: '',
      fechaInicio: '',
      fechaFin: ''
    });
  };

    // Solo pasa datos necesarios a la View
    return (
        <MovimientosView
            movimientos={movimientos}
            loading={loading}
            error={error}
            filtros={filtros}
            onFilterChange={handleFilterChange}
            onRefresh={fetchMovimientos}
            onResetFilters={handleResetFilters}
        />
    );
};

