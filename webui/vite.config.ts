/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		],
		extensions: [
			'.mjs',
			'.js',
			'.ts',
			'.jsx',
			'.tsx',
			'.json',
			'.vue'
		]
	},
	plugins: [
		viteCommonjs(),
		envCompatible(),
		tsconfigPaths(),
	],
	build: {
		assetsDir: './assets',
		copyPublicDir: true,
		outDir: './build',
		rollupOptions: {}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
			reportOnFailure: true,
		},
	},
});
