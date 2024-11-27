import { definePreset } from '@pandacss/dev'
import { textStyles } from './style/textStyles'
import { bodyFontVars, headingFontVars } from './style/textStyles'
import { tokens } from './style/tokens'
import { px2 } from './utils/units'

function createBreakpointVariables() {
	return ['', 'md-', 'lg-'].reduce<
		Record<string, { syntax: string; inherits: boolean; initialValue: string }>
	>((acc, curr) => {
		acc[`--${curr}padding-y`] = {
			syntax: '<length>',
			inherits: false,
			initialValue: 'initial',
		}

		acc[`--${curr}padding-x`] = {
			syntax: '<length>',
			inherits: false,
			initialValue: 'initial',
		}

		acc[`--${curr}gap`] = {
			syntax: '<length>',
			inherits: false,
			initialValue: 'initial',
		}

		return acc
	}, {})
}

function createBreakpointReset() {
	return ['', 'md-', 'lg-'].reduce<Record<string, string>>((acc, curr) => {
		acc[`--${curr}padding-y`] = 'initial'
		acc[`--${curr}padding-x`] = 'initial'
		acc[`--${curr}gap`] = 'initial'

		return acc
	}, {})
}

export default definePreset({
	name: '@spon/ui',
	globalCss: {
		'*': {
			'--align-items': 'initial',
			'--justify-items': 'initial',
			...createBreakpointReset(),
		},
		'.theme': {
			'--scaling': 1,
		},
	},
	globalVars: {
		...bodyFontVars,
		...headingFontVars,
		...createBreakpointVariables(),

		'--align-items': {
			syntax: '<string>',
			inherits: false,
			initialValue: 'initial',
		},

		'--justify-items': {
			syntax: '<string>',
			inherits: false,
			initialValue: 'initial',
		},
	},
	theme: {
		tokens: {
			fonts: {
				body: { value: 'var(--font-body)' },
				heading: { value: ['var(--font-heading)'] },
			},
		},
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
