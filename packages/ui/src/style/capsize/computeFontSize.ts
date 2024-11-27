import { type CapsizeOptions, normaliseOptions } from './normalize'

export const round = (value: number) => parseFloat(value.toFixed(4))

const getVars = (namespace: string) => (style: string) =>
	`var(--${namespace}-${style})`

export function computeFontSize(options: CapsizeOptions, namespace: string) {
	const { fontSize, lineHeight } = normaliseOptions(options)

	const vars = getVars(namespace)

	// const lineHeightScale = contentArea / fontMetrics.unitsPerEm
	const lineHeightNormal = `calc(${vars('line-height')} * ${fontSize})`

	const allowForLineHeight = (trim: string) => {
		if (lineHeight) {
			return `calc((${trim} * -1) - ((${lineHeightNormal} - ${lineHeight}) / 2) / ${fontSize})`
		}

		return trim
	}

	const capHeightTrim = allowForLineHeight(
		`${vars('ascent')} - ${vars('cap-height')} + ${vars('line-gap')} / 2,`,
	)
	const baselineTrim = allowForLineHeight(
		`${vars('descent')} + ${vars('line-gap')} / 2`,
	)

	return {
		lineHeight: String(lineHeight),
		fontSize: String(fontSize),
		marginBottom: capHeightTrim,
		marginTop: baselineTrim,
	}
}
