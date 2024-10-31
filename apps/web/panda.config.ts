import { defineConfig } from '@pandacss/dev'
import preset from '@spon/ui/preset'

export default defineConfig({
	presets: ['@pandacss/dev/presets', preset],
	include: ['../../packages/ui/src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
	importMap: '@spon/styled-system',
	preflight: true,
	outdir: '../../packages/styled-system',
	jsxFramework: 'react',
	minify: true, // process.env.NODE_ENV === 'production',
	hash: true, // process.env.NODE_ENV === 'production',
	cssVarRoot: '.theme',
})
