import type { CapsizeOptions } from './normalize'

export const round = (value: number) => parseFloat(value.toFixed(4))

export function computeFontVariables(
	fontMetrics: CapsizeOptions['fontMetrics'],
	namespace: string,
) {
	const absoluteDescent = Math.abs(fontMetrics.descent)
	const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm
	const descentScale = absoluteDescent / fontMetrics.unitsPerEm
	const ascentScale = fontMetrics.ascent / fontMetrics.unitsPerEm
	const lineGapScale = fontMetrics.lineGap / fontMetrics.unitsPerEm
	const unitsPerEm = fontMetrics.unitsPerEm
	const contentArea = fontMetrics.ascent + fontMetrics.lineGap + absoluteDescent

	return {
		[`--${namespace}-content-area`]: String(contentArea),
		[`--${namespace}-cap-height`]: String(capHeightScale),
		[`--${namespace}-descent`]: String(descentScale),
		[`--${namespace}-ascent`]: String(ascentScale),
		[`--${namespace}-line-gap`]: String(lineGapScale),
		[`--${namespace}-units-per-em`]: String(unitsPerEm),
		[`--${namespace}-line-height`]: `calc(var(--${namespace}-content-area) / ${unitsPerEm})`,
	}
}
