import type { TextStyles } from '@pandacss/types'
import { token } from '@spon/styled-system/tokens'
import { computeFontVariables } from './capsize/computeFontVariables'
import type { TTextStyle} from './capsize/index';
import { fontBuilder } from './capsize/index'

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

const displayFontSize = fontBuilder({
	fontMetrics: headingFontMetrics,
	lineHeights: { 1: 0.9, 2: 1, 3: 1.1, 4: 1.15, 5: 1.2 },
	letterSpacing: { 1: -4, 2: -3, 3: -2, 4: -1, 5: 0 },
	fontFamily: token('fonts.heading'),
})({
	'display/1': { fontSize: 60, leading: 2, tracking: 4 },
	'display/2': { fontSize: 56, leading: 3, tracking: 4 },
	'display/3': { fontSize: 48, leading: 3, tracking: 4 },
	'display/4': { fontSize: 44, leading: 4, tracking: 4 },
	'display/5': { fontSize: 40, leading: 4, tracking: 4 },
	'display/6': { fontSize: 36, leading: 4, tracking: 4 },
	'display/7': { fontSize: 32, leading: 4, tracking: 4 },
	'display/8': { fontSize: 28, leading: 4, tracking: 4 },
})

const headingFontSize = fontBuilder({
	fontMetrics: headingFontMetrics,
	lineHeights: { 1: 1.1, 2: 1.2, 3: 1.3, 4: 1.4, 5: 1.5 },
	letterSpacing: { 1: -3, 2: -2, 3: -1, 4: 0, 5: 1 },
	fontFamily: token('fonts.body'),
})({
	'heading/1': { fontSize: 28, leading: 2, tracking: 3 },
	'heading/2': { fontSize: 26, leading: 2, tracking: 3 },
	'heading/3': { fontSize: 24, leading: 3, tracking: 3 },
	'heading/4': { fontSize: 22, leading: 3, tracking: 3 },
	'heading/5': { fontSize: 20, leading: 3, tracking: 3 },
	'heading/6': { fontSize: 18, leading: 3, tracking: 3 },
	'heading/7': { fontSize: 16, leading: 4, tracking: 3 },
	'heading/8': { fontSize: 14, leading: 4, tracking: 3 },
})

const bodyFontSize = fontBuilder({
	fontMetrics: bodyFontMetrics,
	lineHeights: { 1: 1.2, 2: 1.3, 3: 1.4, 4: 1.5, 5: 1.6 },
	letterSpacing: { 1: -2, 2: -1, 3: 0, 4: 1, 5: 2 },
	fontFamily: token('fonts.body'),
})({
	'body/1': { fontSize: 28, leading: 2, tracking: 3 },
	'body/2': { fontSize: 26, leading: 2, tracking: 3 },
	'body/3': { fontSize: 24, leading: 3, tracking: 3 },
	'body/4': { fontSize: 22, leading: 3, tracking: 3 },
	'body/5': { fontSize: 20, leading: 3, tracking: 3 },
	'body/6': { fontSize: 18, leading: 3, tracking: 3 },
	'body/7': { fontSize: 16, leading: 4, tracking: 3 },
	'body/8': { fontSize: 14, leading: 4, tracking: 3 },
})

const fontSizes = {
	...displayFontSize,
	...headingFontSize,
	...bodyFontSize,
}

type TFontSizeKey = keyof typeof fontSizes
type TTextStyles = Record<TFontSizeKey, TTextStyle>

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
				_before: value['::before'],
				_after: value['::after'],
			},
		}
		return acc
	},
	// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
	{} as TTextStyles,
)
