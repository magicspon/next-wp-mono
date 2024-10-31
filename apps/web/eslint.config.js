import { configs, defineConfig } from '@spon/eslint-config'

export default defineConfig(
	...configs.base,
	...configs.next,
	// ...configs.playwright,
)
