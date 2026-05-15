// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@config': path.resolve(__dirname, './src/appkit.config.js' )
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    host: true, // permite acesso externo
    allowedHosts: ['app.country'], // libera o domínio customizado
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; connect-src 'self' ws: wss: http: https: https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com; font-src 'self' data: https://fonts.gstatic.com;"
    },
    proxy: {
      '/governance-api': {
        target: process.env.VITE_GOVERNANCE_API_URL || 'http://localhost:4002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/governance-api/, ''),
      }
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
      '@reown/appkit-adapter-wagmi'
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
  envPrefix: ['VITE_', 'REACT_APP_']
});
