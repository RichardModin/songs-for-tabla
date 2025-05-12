import { defineConfig } from 'vite'
import { version } from './package.json';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/songs-for-tabla/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
