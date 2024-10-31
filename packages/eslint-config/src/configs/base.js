import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import * as regexpPlugin from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import turboPlugin from 'eslint-plugin-turbo'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from '../utils.js'

export const base = defineConfig(
	{
		ignores: ['.next', '.astro', 'dist', 'storybook-static'],
	},
	{
		ignores: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
	},

	// Base JS/TS configs
	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,

	// Good to have extras
	comments.recommended,
	regexpPlugin.configs['flat/recommended'],
	pluginSecurity.configs.recommended,
	{
		plugins: {
			turbo: turboPlugin,
		},
	},

	// Prettier config to disable conflicting rules
	prettierConfig,

	// JSDoc plugin only for TypeScript files
	// {
	// 	files: ['**/*.{ts,tsx}'],
	// 	extends: [jsdoc.configs['flat/recommended-typescript-error']],
	// },

	{
		files: ['**/*.cjs'],
		languageOptions: {
			sourceType: 'commonjs',
		},
	},

	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		settings: {
			tailwindcss: {
				callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
			},
		},
		rules: {
			'security/detect-object-injection': 'off',
			'security/detect-non-literal-fs-filename': 'off',
			...turboPlugin.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: 'React',
				},
			],
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/require-await': 'off',

			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],

			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { attributes: false } },
			],
		},
	},
	{
		ignores: ['.sanity/*', 'dist/'],
	},
)
