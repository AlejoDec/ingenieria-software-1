import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { XCircleIcon, SpinnerIcon } from '../../../components/shared/Icons.jsx';
import '../styles/Movimientos.css';

export const MovimientosView = ({
  movimientos = [], // Valor por defecto para evitar undefined
  loading,
  error,
  filtros,
  onFilterChange,
  onRefresh,
  onResetFilters
}) => {
  const tiposMovimiento = {
    entrada: { label: 'Entrada', class: 'badge-entrada' },
    salida: { label: 'Salida', class: 'badge-salida' },
    traslado: { label: 'Traslado', class: 'badge-traslado' },
    ajuste: { label: 'Ajuste', class: 'badge-ajuste' }
  };

  // Icono de refresh usando SpinnerIcon
  const RefreshIcon = ({ className }) => (
    <SpinnerIcon className={className.replace('animate-spin', '')} />
  );

  return (
    <div className="movimientos-container">
      <div className="header-section">
        <h1 className="movimientos-title">Trazabilidad de Movimientos</h1>
        <div className="actions-section">
          <button
            className="refresh-button"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshIcon className="refresh-icon" />
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filter-group">
          <label>Producto</label>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtros.producto}
            onChange={(e) => onFilterChange('producto', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Sede</label>
          <input
            type="text"
            placeholder="Buscar por sede"
            value={filtros.sede}
            onChange={(e) => onFilterChange('sede', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Fecha Inicio</label>
          <input
            type="date"
            value={filtros.fechaInicio}
            onChange={(e) => onFilterChange('fechaInicio', e.target.value)}
            max={filtros.fechaFin || undefined}
          />
        </div>

        <div className="filter-group">
          <label>Fecha Fin</label>
          <input
            type="date"
            value={filtros.fechaFin}
            onChange={(e) => onFilterChange('fechaFin', e.target.value)}
            min={filtros.fechaInicio || undefined}
          />
        </div>

        <button
          className="refresh-button"
          onClick={onResetFilters}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="error-message">
          <XCircleIcon className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Contenido */}
      {loading ? (
        <div className="loading-spinner">
          <SpinnerIcon className="h-12 w-12" />
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="movimientos-table">
            <thead className="table-header">
              <tr>
                <th className="table-head-cell">ID</th>
                <th className="table-head-cell">Producto</th>
                <th className="table-head-cell">ID Producto</th>
                <th className="table-head-cell">Sede Origen</th>
                <th className="table-head-cell">Sede Destino</th>
                <th className="table-head-cell">Cantidad</th>
                <th className="table-head-cell">Tipo</th>
                <th className="table-head-cell">Usuario</th>
                <th className="table-head-cell">Fecha</th>
                <th className="table-head-cell">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movimientos) && movimientos.length > 0 ? (
                movimientos.map((movimiento) => {
                  // Debug: console.log para ver la estructura de un movimiento
                  console.log('Movimiento:', movimiento);
                  
                  return (
                    <tr key={movimiento.id} className="table-row">
                      <td className="table-cell">{movimiento.id}</td>
                      <td className="table-cell">
                        {movimiento.producto?.nombre || movimiento.Producto?.nombre || 'N/A'}
                      </td>
                      <td className="table-cell">{movimiento.producto_id}</td>
                      <td className="table-cell">
                        {movimiento.origen?.nombre || movimiento.SedeOrigen?.nombre || '—'}
                      </td>
                      <td className="table-cell">
                        {movimiento.destino?.nombre || movimiento.SedeDestino?.nombre || '—'}
                      </td>
                      <td className={`table-cell ${movimiento.tipo === 'entrada' ? 'cantidad-positiva' : 'cantidad-negativa'}`}>
                        {movimiento.tipo === 'entrada' ? '+' : ''}{movimiento.cantidad}
                      </td>
                      <td className="table-cell">
                        <span className={`badge ${tiposMovimiento[movimiento.tipo]?.class || ''}`}>
                          {tiposMovimiento[movimiento.tipo]?.label || movimiento.tipo}
                        </span>
                      </td>
                      <td className="table-cell">
                        {movimiento.usuario?.nombre || movimiento.Usuario?.nombre || movimiento.usuario_id}
                      </td>
                      <td className="table-cell">
                        {movimiento.fecha ? format(new Date(movimiento.fecha), 'PPpp', { locale: es }) : '—'}
                      </td>
                      <td className="table-cell">{movimiento.observaciones || '—'}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="table-cell text-center py-4">
                    {Array.isArray(movimientos) ? 'No se encontraron movimientos con los filtros actuales' : 'Error al cargar los datos'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};