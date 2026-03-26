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
    // Mudamos de 'threads' para 'forks' para evitar conflitos de módulos na memória
    pool: 'forks',
    // Desativamos o paralelismo para o Node não se perder nos imports
    fileParallelism: false,

    server: {
      deps: {
        // Forçamos o Vitest a processar essas bibliotecas problemáticas
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