import type { FontMetrics } from '@capsizecss/core'

export type ComputedValues = {
	fontSize: string
	lineHeight: string
	capHeightTrim: string
	baselineTrim: string
}

type NotComputedValues = {
	[V in keyof ComputedValues]?: never
}

type FontMetricsForTrim = Pick<
	FontMetrics,
	'ascent' | 'descent' | 'capHeight' | 'lineGap' | 'unitsPerEm'
>

type CapHeightWithLeading = {
	capHeight: number
	leading?: number
	fontMetrics: FontMetricsForTrim
} & NotComputedValues

type CapHeightWithLineGap = {
	capHeight: number
	lineGap: number
	fontMetrics: FontMetricsForTrim
} & NotComputedValues

type FontSizeWithLeading = {
	fontSize: number
	leading?: number
	fontMetrics: FontMetricsForTrim
} & Omit<NotComputedValues, 'fontSize'>

type FontSizeWithLineGap = {
	fontSize: number
	lineGap: number
	fontMetrics: FontMetricsForTrim
} & Omit<NotComputedValues, 'fontSize'>

export type CapsizeOptions =
	| CapHeightWithLineGap
	| CapHeightWithLeading
	| FontSizeWithLineGap
	| FontSizeWithLeading

export function normaliseOptions(options: CapsizeOptions) {
	if ('leading' in options && 'lineGap' in options) {
		throw new Error(
			'Only a single line height style can be provided. Please pass either `lineGap` OR `leading`.',
		)
	}

	if ('capHeight' in options && 'fontSize' in options) {
		throw new Error('Please pass either `capHeight` OR `fontSize`, not both.')
	}

	const { fontMetrics } = options
	const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm

	let specifiedFontSize: number
	let specifiedCapHeight: number

	if ('capHeight' in options) {
		specifiedFontSize = options.capHeight / capHeightScale
		specifiedCapHeight = options.capHeight
	} else if ('fontSize' in options) {
		specifiedFontSize = options.fontSize
		specifiedCapHeight = options.fontSize * capHeightScale
	} else {
		throw new Error('Please pass either `capHeight` OR `fontSize`.')
	}

	let specifiedLineHeight: number | undefined

	if ('lineGap' in options) {
		specifiedLineHeight = specifiedCapHeight + options.lineGap
	} else if ('leading' in options) {
		specifiedLineHeight = options.leading
	}

	return {
		fontSize: specifiedFontSize,
		lineHeight: specifiedLineHeight,
		fontMetrics,
	}
}
