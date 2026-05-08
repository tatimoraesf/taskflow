import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    exclude: ['e2e/**', '.claude/**', 'node_modules/**'],
    pool: 'forks',
    fileParallelism: false,

    server: {
      deps: {
        inline: ['@csstools/css-calc', '@asamuzakjp/css-color']
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})