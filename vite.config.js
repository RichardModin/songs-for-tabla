import { defineConfig } from 'vite'
import { version } from './package.json';
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-gh-pages'

// https://vite.dev/config/
export default defineConfig({
  base: '/songs-for-tabla/',
  plugins: [react(), ghPages()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
