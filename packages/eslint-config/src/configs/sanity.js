import { fixupConfigRules } from '@eslint/compat'
import { compat, defineConfig } from '../utils.js'

export const sanity = defineConfig(
	{
		ignores: ['.sanity'],
	},
	...fixupConfigRules(compat.extends('@sanity/eslint-config-studio')),
	{
		files: ['*.@(ts|tsx|js|jsx|mjs|cjs)'],
		rules: {},
	},
)
