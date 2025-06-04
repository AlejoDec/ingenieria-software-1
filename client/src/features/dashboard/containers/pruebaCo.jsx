import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import TrazabilidadView from '../components/prueba.jsx';

const TrazabilidadContainer = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    sedeId: '',
    productoId: '',
    tipo: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      const params = {
        sede_id: filtros.sedeId || undefined,
        producto_id: filtros.productoId || undefined,
        tipo: filtros.tipo || undefined,
        fecha_inicio: filtros.fechaInicio || undefined,
        fecha_fin: filtros.fechaFin || undefined
      };
      
      const response = await axiosInstance.get('/movimientos', { params });
      setMovimientos(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error al cargar movimientos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimientos();
  }, [filtros]);

  const handleFilterChange = (name, value) => {
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <TrazabilidadView
      movimientos={movimientos}
      loading={loading}
      error={error}
      filtros={filtros}
      onFilterChange={handleFilterChange}
      onRefresh={fetchMovimientos}
    />
  );
};

export default TrazabilidadContainer;