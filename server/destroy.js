import Usuario from "./models/Usuario.js";

await Usuario.destroy({ where: { email: 'admin@example.com' } });
