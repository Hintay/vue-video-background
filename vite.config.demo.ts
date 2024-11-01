import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './demo/public/build',
    rollupOptions: {
      input: './demo/app.ts',
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      },
    },
  },

  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],
})
