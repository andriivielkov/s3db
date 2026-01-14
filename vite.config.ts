import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-antd': ['antd', '@ant-design/icons'],
          'vendor-formik': ['formik', 'yup'],
        },
      },
    },
  },
})
