import Producto from "./Producto.js";
import Movimiento from "./Movimiento.js";
import Usuario from './Usuario.js';
import Sede from './Sede.js';
import InventarioSede from './InventarioSede.js';

// Producto tiene muchos InventarioSede (productos en distintas sedes)
Producto.hasMany(InventarioSede, { foreignKey: 'producto_id', as: 'inventarios' });
// Aquí defines el alias 'producto' para usar en los include
InventarioSede.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

// Sede tiene muchos InventarioSede
Sede.hasMany(InventarioSede, { foreignKey: 'sede_id', as: 'inventarios' });
// Alias para sede en InventarioSede
InventarioSede.belongsTo(Sede, { foreignKey: 'sede_id', as: 'sede' });

// Relación Movimiento con Producto
Producto.hasMany(Movimiento, { foreignKey: 'producto_id' });
Movimiento.belongsTo(Producto, { foreignKey: 'producto_id' });

// Relación Usuario con Sede
Sede.hasMany(Usuario, { foreignKey: 'sede_id' });
Usuario.belongsTo(Sede, { foreignKey: 'sede_id' });

// Relaciones para los movimientos entre sedes
Movimiento.belongsTo(Sede, { foreignKey: 'sede_origen_id', as: 'origen' });
Movimiento.belongsTo(Sede, { foreignKey: 'sede_destino_id', as: 'destino' });
Movimiento.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export {
  Producto,
  Movimiento,
  Usuario,
  Sede,
  InventarioSede
};