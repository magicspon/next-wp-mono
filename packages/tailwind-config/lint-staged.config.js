/** @type {import("lint-staged").Config} */
const config = {
	'*.{js,cjs,ts,tsx}': 'npm run lint',
}

export default config
