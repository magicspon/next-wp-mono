import { createStyleObject } from '@capsizecss/core'
import type { TextStyles } from '@pandacss/types'

type TFontSizeKey = keyof typeof fontSizes

type TTextStyle = {
	value: {
		'--font-size': string
		fontSize: string
		lineHeight: number
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

const createBody = (fontSize: number, leading: number) => {
	return createStyleObject({
		fontSize,
		leading,
		fontMetrics: bodyFontMetrics,
	})
}

const createHeading = (fontSize: number, leading: number) => {
	return createStyleObject({
		fontSize,
		leading,
		fontMetrics: headingFontMetrics,
	})
}

const bodyFontSize = {
	'body/1': createBody(12, 16),
	'body/2': createBody(14, 20),
	'body/3': createBody(16, 24),
	'body/4': createBody(18, 26),
	'body/5': createBody(20, 28),
	'body/6': createBody(24, 30),
	'body/7': createBody(28, 36),
	'body/8': createBody(36, 40),
	'body/9': createBody(60, 60),
} as const

const headingFontSize = {
	'heading/1': createHeading(12, 16),
	'heading/2': createHeading(14, 20),
	'heading/3': createHeading(16, 24),
	'heading/4': createHeading(18, 26),
	'heading/5': createHeading(20, 28),
	'heading/6': createHeading(24, 30),
	'heading/7': createHeading(28, 36),
	'heading/8': createHeading(36, 40),
	'heading/9': createHeading(60, 60),
} as const

const fontSizes = { ...bodyFontSize, ...headingFontSize }

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
				lineHeight: parseFloat(value.lineHeight) / fs,
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
