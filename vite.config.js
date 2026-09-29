import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['three', 'three/addons/loaders/GLTFLoader.js', 'three/addons/controls/OrbitControls.js'],
      output: {
        globals: {
          three: 'THREE',
          'three/addons/loaders/GLTFLoader.js': 'THREE',
          'three/addons/controls/OrbitControls.js': 'THREE'
        }
      }
    }
  },
  server: {
    port: 5173
  }
})