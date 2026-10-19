import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      target: 'es2022',
    },
    plugins: [react(), viteTsconfigPaths(), splitVendorChunkPlugin()],
    preview: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
        '/browseable': {
          target: process.env.VITE_API_URL, // same as your backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};

export default config;
