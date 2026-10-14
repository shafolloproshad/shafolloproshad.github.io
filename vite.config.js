import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `npm run build` makes the GitHub Pages site (served from the domain root).
// `npm run build:preview` makes a self-contained copy with relative paths and
// in-memory routing, used only for previews outside GitHub Pages.
export default defineConfig(({ mode }) => {
  const preview = mode === 'artifact'
  return {
    plugins: [react()],
    base: preview ? './' : '/',
    define: preview ? { 'import.meta.env.VITE_ROUTER': JSON.stringify('memory') } : {},
    build: {
      outDir: preview ? 'dist-preview' : 'dist',
    },
  }
})
