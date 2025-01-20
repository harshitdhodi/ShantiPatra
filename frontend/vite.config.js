import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optional: Add resolve to handle paths better
  resolve: {
    alias: {
      '@': '/src', // For cleaner imports, optional
    },
  },
  // Proxy configuration
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3006", // Backend server URL
    //     changeOrigin: true, // Change the origin of the host header to the target URL
    //     secure: false, // Set to false if you're not using HTTPS
    //      },
    // },
  },
});
 