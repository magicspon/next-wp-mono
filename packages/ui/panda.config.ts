import { defineConfig } from '@pandacss/dev'
import preset from './src/preset'

export default defineConfig({
	presets: ['@pandacss/dev/presets', preset],
	preflight: true,
	include: ['./src/**/*.{js,jsx,ts,tsx}'],
	importMap: '@spon/styled-system',
	outdir: '../styled-system',
	jsxFramework: 'react',
	minify: true, // process.env.NODE_ENV === 'production',
	hash: true, // process.env.NODE_ENV === 'production',
	cssVarRoot: '.theme',
})
