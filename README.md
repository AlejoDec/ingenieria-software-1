# Sol - Inventory

Este proyecto está desarrollado con React y Vite, proporcionando una configuración mínima con Hot Module Replacement (HMR) y reglas ESLint.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlejoDec/ingenieria-software-1
   cd ingenieria-software-1
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

## Ejecución en local

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Esto iniciará el servidor en `http://localhost:5173` (o el primer puerto disponible).

## Estructura del proyecto

```
/
├── public/          # Archivos estáticos
├── src/             # Código fuente
│   ├── assets/      # Recursos (imágenes, fuentes, etc.)
│   ├── components/  # Componentes React
│   ├── App.jsx      # Componente principal
│   └── main.jsx     # Punto de entrada
├── index.html       # Plantilla HTML
└── package.json     # Dependencias y scripts
```

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)

## Ampliando la configuración de ESLint

Si estás desarrollando una aplicación para producción, recomendamos usar TypeScript y habilitar reglas de linting con reconocimiento de tipos. Consulta la [plantilla TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.
