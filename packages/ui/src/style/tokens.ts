import { defineTokens } from '@pandacss/dev'
import { px2 } from 'src/utils/units'
import { colors } from './colors'

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
	colors,
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

	fontSizes: {
		'1': { value: px2(12) },
		'2': { value: px2(14) },
		'3': { value: px2(16) },
		'4': { value: px2(18) },
		'5': { value: px2(20) },
		'6': { value: px2(24) },
		'7': { value: px2(28) },
		'8': { value: px2(36) },
		'9': { value: px2(60) },
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
