import type { FontMetrics } from '@capsizecss/core'
import { createStyleObject } from '@capsizecss/core'
import type { TextStyles } from '@pandacss/types'
import { token } from '@spon/styled-system/tokens'
import { computeFontVariables } from './capsize/computeFontVariables'

export const round = (value: number) => parseFloat(value.toFixed(4))

type TFontSizeKey = keyof typeof fontSizes

type TTextStyle = {
	value: {
		'--font-size': string
		fontSize: string
		lineHeight: number
		fontFamily: string
		letterSpacing: string
		_before: {
			content: string
			marginBottom: string
			display: string
		}
		_after: {
			content: string
			marginTop: string
			display: string
		}
	}
}

type TTextStyles = Record<TFontSizeKey, TTextStyle>

const bodyFontMetrics = {
	capHeight: 715,
	ascent: 960,
	descent: -190,
	lineGap: 0,
	unitsPerEm: 1000,
	xHeight: 517,
	xWidthAvg: 502,
}

const headingFontMetrics = {
	capHeight: 666,
	ascent: 841,
	descent: -231,
	lineGap: 0,
	unitsPerEm: 1000,
	xHeight: 480,
	xWidthAvg: 302,
}

export const bodyFontVars = computeFontVariables(bodyFontMetrics, 'body')
export const headingFontVars = computeFontVariables(
	headingFontMetrics,
	'heading',
)

type TFontSchema = {
	fontMetrics: Omit<FontMetrics, 'familyName' | 'postscriptName' | 'fullName'>
	lineHeights: Record<number, number>
	letterSpacing: Record<number, number>
	fontFamily: string
}

const fontBuilder = ({
	fontMetrics,
	lineHeights,
	fontFamily,
	letterSpacing,
}: TFontSchema) => {
	const multi = (v: number, key: keyof typeof lineHeights) =>
		v * lineHeights[key]!

	return ({
		fontSize,
		leading,
		tracking,
	}: {
		fontSize: number
		leading: number
		tracking: number
	}) => {
		const track = letterSpacing[tracking]!
		const t = ((fontSize / 100) * track) / 16

		return {
			...createStyleObject({
				fontSize,
				leading: multi(fontSize, leading),
				fontMetrics,
			}),
			letterSpacing: `${t}em`,
			fontFamily: fontFamily,
		}
	}
}

const displayBuilder = fontBuilder({
	fontMetrics: headingFontMetrics,
	lineHeights: {
		1: 0.9,
		2: 1,
		3: 1.1,
		4: 1.15,
		5: 1.2,
	},
	letterSpacing: {
		1: -4,
		2: -3,
		3: -2,
		4: -1,
		5: 0,
	},
	fontFamily: token('fonts.heading'),
})
const displayFontSize = {
	'display/1': displayBuilder({ fontSize: 60, leading: 2, tracking: 4 }),
	'display/2': displayBuilder({ fontSize: 56, leading: 3, tracking: 4 }),
	'display/3': displayBuilder({ fontSize: 48, leading: 3, tracking: 4 }),
	'display/4': displayBuilder({ fontSize: 44, leading: 4, tracking: 4 }),
	'display/5': displayBuilder({ fontSize: 40, leading: 4, tracking: 4 }),
	'display/6': displayBuilder({ fontSize: 36, leading: 4, tracking: 4 }),
	'display/7': displayBuilder({ fontSize: 32, leading: 4, tracking: 4 }),
	'display/8': displayBuilder({ fontSize: 28, leading: 4, tracking: 4 }),
} as const

const headingBuilder = fontBuilder({
	fontMetrics: headingFontMetrics,
	lineHeights: {
		1: 1.1,
		2: 1.2,
		3: 1.3,
		4: 1.4,
		5: 1.5,
	},
	letterSpacing: {
		1: -3,
		2: -2,
		3: -1,
		4: 0,
		5: 1,
	},
	fontFamily: token('fonts.body'),
})
const headingFontSize = {
	'heading/1': headingBuilder({ fontSize: 28, leading: 2, tracking: 3 }),
	'heading/2': headingBuilder({ fontSize: 26, leading: 2, tracking: 3 }),
	'heading/3': headingBuilder({ fontSize: 24, leading: 3, tracking: 3 }),
	'heading/4': headingBuilder({ fontSize: 22, leading: 3, tracking: 3 }),
	'heading/5': headingBuilder({ fontSize: 20, leading: 3, tracking: 3 }),
	'heading/6': headingBuilder({ fontSize: 18, leading: 3, tracking: 3 }),
	'heading/7': headingBuilder({ fontSize: 16, leading: 4, tracking: 3 }),
	'heading/8': headingBuilder({ fontSize: 14, leading: 4, tracking: 3 }),
} as const

const bodyBuilder = fontBuilder({
	fontMetrics: bodyFontMetrics,
	lineHeights: {
		1: 1.2,
		2: 1.3,
		3: 1.4,
		4: 1.5,
		5: 1.6,
	},
	letterSpacing: {
		1: -2,
		2: -1,
		3: 0,
		4: 1,
		5: 2,
	},
	fontFamily: token('fonts.body'),
})
const bodyFontSize = {
	'body/1': bodyBuilder({ fontSize: 28, leading: 2, tracking: 3 }),
	'body/2': bodyBuilder({ fontSize: 26, leading: 2, tracking: 3 }),
	'body/3': bodyBuilder({ fontSize: 24, leading: 3, tracking: 3 }),
	'body/4': bodyBuilder({ fontSize: 22, leading: 3, tracking: 3 }),
	'body/5': bodyBuilder({ fontSize: 20, leading: 3, tracking: 3 }),
	'body/6': bodyBuilder({ fontSize: 18, leading: 3, tracking: 3 }),
	'body/7': bodyBuilder({ fontSize: 16, leading: 4, tracking: 3 }),
	'body/8': bodyBuilder({ fontSize: 14, leading: 4, tracking: 3 }),
} as const

const fontSizes = {
	...displayFontSize,
	...headingFontSize,
	...bodyFontSize,
	// ...headingFontSize,
}

export const textStyles: TextStyles = Object.entries(
	fontSizes,
).reduce<TTextStyles>(
	(acc, [key, value]) => {
		const fs = parseFloat(value.fontSize)
		const asRem = `${fs / 16}rem`
		acc[key as TFontSizeKey] = {
			value: {
				'--font-size': asRem,
				fontSize: `calc(var(--font-size) * var(--scaling))`,
				fontFamily: value.fontFamily,
				lineHeight: parseFloat(value.lineHeight) / fs,
				letterSpacing: value.letterSpacing,
				_before: {
					content: "''",
					marginBottom: value['::before'].marginBottom,
					display: 'table',
				},
				_after: {
					content: "''",
					marginTop: value['::after'].marginTop,
					display: 'table',
				},
			},
		}
		return acc
	},
	// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
	{} as TTextStyles,
)
