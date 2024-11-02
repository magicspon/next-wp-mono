import { configs, defineConfig } from '@spon/eslint-config'

export default defineConfig(
	...configs.base,
	...configs.next,
	{
		ignores: ['app/schema/*.ts'],
	},
	// ...configs.playwright,
)
