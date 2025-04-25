import 'dotenv/config';
import Usuario  from './models/Usuario.js';
import { sequelize } from './config/db.js';

const crearAdmin = async () => {
    try {
        await sequelize.authenticate();

        const yaExiste = await Usuario.findOne({ where: { email: process.env.ADMIN_EMAIL } });
        if (yaExiste) {
            console.log("Ya existe un usuario con ese correo.");
            return;
        }

        const hashedPassword = process.env.ADMIN_PASSWORD;

        const admin = await Usuario.create({
            nombre: process.env.ADMIN_NOMBRE,
            email: process.env.ADMIN_EMAIL,
            contraseña: hashedPassword,
            sede_id: 1, // Asume que la sede 1 es la principal o crea una válida antes
            rol: 'usuario'
        });

        console.log("✅ Usuario administrador creado con éxito:", admin.email);

    } catch (error) {
        console.error(" Error al crear el administrador:", error);
    } finally {
        await sequelize.close();
    }
}

crearAdmin();