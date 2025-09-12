import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
    },
    define: {
        global: 'globalThis'
    },
    server: {
        allowedHosts: [
            '5kaquarium.local.com', // thêm host bạn muốn cho phép
        ],
    },
});
