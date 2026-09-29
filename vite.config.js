import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      external: ['three', 'three/addons/loaders/GLTFLoader.js', 'three/addons/controls/OrbitControls.js'],
      output: {
        globals: {
          three: 'THREE'
        }
      }
    }
  },
  server: {
    port: 5173,
  },
});