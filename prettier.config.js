/** @type {import("prettier").Config} */
export default {
	plugins: [
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports',
	],
	bracketSpacing: true,
	printWidth: 80,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	importOrder: ['<THIRD_PARTY_MODULES>', '^@spon*/(.*)$', '^~/(.*)$', '^[./]'],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
}
