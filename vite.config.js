// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@config': path.resolve(__dirname, './src/appkit.config.js' ),
      '@adapters': path.resolve(__dirname, './src/adapters'),
      '@solana/wallet-adapter-wallets': path.resolve(__dirname, 'node_modules/@solana/wallet-adapter-wallets'),
      '@solana/wallet-adapter-base': path.resolve(__dirname, 'node_modules/@solana/wallet-adapter-base')
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    host: true, // permite acesso externo
    allowedHosts: ['app.axodus.finance'], // libera o domínio customizado
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' ws: wss: http: https:; font-src 'self' data: https:;"
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  metadata: {
    name: "Axodus",
    description: "Axodus app",
    url: process.env.VITE_PUBLIC_URL || "http://localhost:5174", // fallback local
  },
  optimizeDeps: {
    include: [
      '@reown/appkit',
      '@reown/appkit/react',
      '@reown/appkit/networks',
      '@reown/appkit-adapter-wagmi',
      '@reown/appkit-adapter-solana',
      '@reown/appkit-adapter-bitcoin',
      '@solana/wallet-adapter-wallets',
      '@solana/wallet-adapter-base'
    ]
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [

      ]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  envPrefix: ['VITE_', 'REACT_APP_']
});
