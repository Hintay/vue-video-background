import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',

    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueResponsiveVideoBackgroundPlayer',
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
        // in index.js we use a named + default export.
        // We hide the error message with 'named'
        exports: 'named',
      },
    },
  },

  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],
})
