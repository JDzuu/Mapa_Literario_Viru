import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Rutas relativas para que dist/ funcione en cualquier subpath
  base: './',

  // Escucha en toda la red local para probar desde el celular
  server: {
    host: true,
  },
});
