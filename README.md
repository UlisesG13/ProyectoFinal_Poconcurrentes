# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

**Proyecto: Frontend para interacción con Moodle (mock)**

Instrucciones rápidas para correr el frontend localmente:

- Instalar dependencias:

```powershell
npm install
```

- Instalar `react-router-dom` (si `npm install` no lo agregó automáticamente):

```powershell
npm install react-router-dom
```

- Iniciar servidor de desarrollo:

```powershell
npm run dev
```

Estructura inicial creada en `src/` sigue la arquitectura atómica: `components/atoms`, `components/molecules`, `components/organisms`, `layouts`, `pages`, `services`.

El archivo `data/db-schema.md` contiene el diseño propuesto de la base de datos y la población de ejemplo. `src/services/mockApi.js` contiene un mock que genera los datos solicitados (1 programa, 10 cuatrimestres, 70 asignaturas, 35 docentes, 35 grupos y 875 alumnos) para pruebas del frontend.

Siguiente paso propuesto: conectar este frontend con una API real (por ejemplo una pequeña API Express o la API REST de Moodle) y reemplazar `mockApi` por llamadas reales.
