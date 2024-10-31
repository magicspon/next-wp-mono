import { defineTokens } from '@pandacss/dev'
import { px2 } from 'src/utils/units'

const calc = (v: string) => `calc(${v} * var(--scaling))`

const spacing = {
	px: { value: '1px' },
	0: { value: calc(px2(0)) },
	0.5: { value: calc(px2(2)) },
	1: { value: calc(px2(4)) },
	1.5: { value: calc(px2(6)) },
	2: { value: calc(px2(8)) },
	2.5: { value: calc(px2(10)) },
	3: { value: calc(px2(12)) },
	3.5: { value: calc(px2(14)) },
	4: { value: calc(px2(16)) },
	5: { value: calc(px2(20)) },
	6: { value: calc(px2(24)) },
	7: { value: calc(px2(28)) },
	8: { value: calc(px2(32)) },
	9: { value: calc(px2(36)) },
	10: { value: calc(px2(40)) },
	11: { value: calc(px2(44)) },
	12: { value: calc(px2(48)) },
	14: { value: calc(px2(56)) },
	16: { value: calc(px2(64)) },
	20: { value: calc(px2(80)) },
	24: { value: calc(px2(96)) },
	28: { value: calc(px2(112)) },
	32: { value: calc(px2(128)) },
	36: { value: calc(px2(144)) },
	40: { value: calc(px2(160)) },
	44: { value: calc(px2(176)) },
	48: { value: calc(px2(192)) },
	52: { value: calc(px2(208)) },
	56: { value: calc(px2(224)) },
	60: { value: calc(px2(240)) },
	64: { value: calc(px2(256)) },
	72: { value: calc(px2(288)) },
	80: { value: calc(px2(320)) },
	96: { value: calc(px2(384)) },
}

export const tokens = defineTokens({
	colors: {
		foreground: { value: '#050505' },
		background: { value: '#F7F6F6' },

		black: {
			value: '{colors.black.600}',
			600: { value: '#050505' },
			500: { value: '#0F0F0F' },
			400: { value: '#1B1B1B' },
			300: { value: '#232323' },
			200: { value: '#333' },
			100: { value: '#444' },
		},

		white: {
			value: '{colors.white.100}',
			600: { value: '#E7E7E8' },
			500: { value: '#E7E7E8' },
			400: { value: '#F6F2F3' },
			300: { value: '#FCF8F9' },
			200: { value: '#F7F6F6' },
			100: { value: '#fff' },
		},

		primary: {
			value: '#f1f1f1',
			foreground: {
				value: '#1a1a1a',
			},
		},
		secondary: {
			value: '#f1f1f1',
			foreground: {
				value: '#1a1a1a',
			},
		},
		accent: {
			value: '#f1f1f1',
			foreground: {
				value: '#1a1a1a',
			},
		},
		hint: {
			value: '#f1f1f1',
			foreground: {
				value: '#1a1a1a',
			},
		},
	},
	fonts: {
		body: { value: 'var(--font-body)' },
		heading: { value: ['var(--font-heading)'] },
	},

	spacing,

	sizes: {
		...spacing,
		xs: { value: px2(320) },
		sm: { value: px2(384) },
		md: { value: px2(448) },
		lg: { value: px2(512) },
		xl: { value: px2(576) },
		'2xl': { value: px2(672) },
		'3xl': { value: px2(768) },
		'4xl': { value: px2(896) },
		'5xl': { value: px2(1024) },
		'6xl': { value: px2(1152) },
		'7xl': { value: px2(1280) },
		'8xl': { value: px2(1440) },
		prose: { value: '65ch' },
		full: { value: '100%' },
		min: { value: 'min-content' },
		max: { value: 'max-content' },
		fit: { value: 'fit-content' },
	},

	grid: {
		card: {
			value: px2(280),
		},
	},

	scaling: {
		0.25: { value: 0.25 },
		0.5: { value: 0.5 },
		0.75: { value: 1.75 },
		1: { value: 1 },
		1.25: { value: 1.25 },
		1.5: { value: 1.5 },
		2: { value: 2 },
		3: { value: 3 },
	},
})
