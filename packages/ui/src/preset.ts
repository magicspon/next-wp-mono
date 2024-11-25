import { definePreset } from '@pandacss/dev'
import { textStyles } from './style/textStyles'
import { tokens } from './style/tokens'
import { px2 } from './utils/units'

export default definePreset({
	name: '@spon/ui',
	globalCss: {
		'.theme': {
			'--scaling': 1,
		},
	},
	theme: {
		breakpoints: {
			sm: px2(640, 'em'),
			md: px2(768, 'em'),
			lg: px2(1024, 'em'),
			xl: px2(1280, 'em'),
			'2xl': px2(1536, 'em'),
		},
		containerSizes: {
			xs: px2(320),
			sm: px2(384),
			md: px2(448),
			lg: px2(512),
			xl: px2(576),
			'2xl': px2(672),
			'3xl': px2(768),
			'4xl': px2(896),
			'5xl': px2(1024),
			'6xl': px2(1152),
			'7xl': px2(1280),
			'8xl': px2(1440),
		},
		textStyles,
		extend: {
			tokens,
		},
	},

	utilities: {
		scaling: {
			className: 'scaling',
			values: 'scaling',

			transform(value) {
				return { '--scaling': value }
			},
		},
	},
	conditions: {
		extend: {
			highlight: '& > strong',
		},
	},
})
