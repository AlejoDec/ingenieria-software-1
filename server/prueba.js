import bcrypt from 'bcryptjs';

const probarHash = async () => {
  const hash = '$2b$10$ex9lqupxKcWVQ387utDMceFtwtNjCTX/U.Xs91ngD4clELYGy1R4a';
  const esValido = await bcrypt.compare('123456', hash);
  console.log("¿Es válido?", esValido);
};

probarHash();
