import { defineConfig } from 'taze'

export default defineConfig({
	// ignore paths for looking for package.json in monorepo
	ignorePaths: ['**/node_modules/**', '**/test/**', 'apps/cms/**'],
})
