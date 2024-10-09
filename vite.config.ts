import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,  // Prevents Terser from removing console logs
            },
        },
    }
});
