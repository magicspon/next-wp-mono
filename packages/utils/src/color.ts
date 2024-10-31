import Color from 'colorjs.io'

export const hexToHsl = (hex: string) => {
	const [h, s, l] = new Color(hex)
		.to('hsl')
		.coords.map((v) => (isNaN(v) ? '0' : v.toFixed(2)))

	return `${h} ${s}% ${l}%`
}

function _hslToHex(num: [number, number, number]) {
	const [h, s, L] = num
	const l = L / 100
	const a = (s * Math.min(l, 1 - l)) / 100
	const f = (n: number) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0') // convert to Hex and prefix "0" if needed
	}
	return `#${f(0)}${f(8)}${f(4)}` as `#${string}`
}

export const hslToHex = (hsl: string) => {
	return _hslToHex(
		hsl.split(' ').map((v) => parseFloat(v)) as [number, number, number],
	)
}
