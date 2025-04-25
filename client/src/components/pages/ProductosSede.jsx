import './Productos.css'

export const ProductosView = ({ productos, sede }) => {
  if (!Array.isArray(productos)) return <div>Error en los datos</div>;
  return (
    <div className="table-wrapper">
      <table className="productos-table">
        <thead className="table-header">
          <tr>
            <th className="table-head-cell">Nombre</th>
            <th className="table-head-cell">Referencia</th>
            <th className="table-head-cell">Categoría</th>
            <th className="table-head-cell">Descripción</th>
            <th className="table-head-cell">Stock</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {productos
            .filter((prod) => prod.producto)
            .map((prod) => (
              <tr key={prod.id || prod.producto_id} className="table-row">
                <td className="table-cell">{prod.producto.nombre}</td>
                <td className="table-cell">{prod.producto.referencia}</td>
                <td className="table-cell">{prod.producto.categoria}</td>
                <td className="table-cell descripcion-cell">{prod.producto.descripcion}</td>
                <td className="table-cell stock-cell">{prod.stock}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="sede-info">
        Mostrando productos de: {sede.charAt(0).toUpperCase() + sede.slice(1)}
      </div>
    </div>
  );
};