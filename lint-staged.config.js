/** @type {import("lint-staged").Config} */
const config = {
	'*.{js,ts,tsx,css}': ['npm run format'],
}

export default config
