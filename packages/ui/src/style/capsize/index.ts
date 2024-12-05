import type { FontMetrics} from '@capsizecss/core';
import { createStyleObject } from '@capsizecss/core'

export const round = (value: number) => parseFloat(value.toFixed(4))

export type TTextStyle = {
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

type TFontSchema = {
	fontMetrics: Omit<FontMetrics, 'familyName' | 'postscriptName' | 'fullName'>
	lineHeights: Record<number, number>
	letterSpacing: Record<number, number>
	fontFamily: string
}

export const fontBuilder = ({
	fontMetrics,
	lineHeights,
	fontFamily,
	letterSpacing,
}: TFontSchema) => {
	const multi = (v: number, key: keyof typeof lineHeights) =>
		v * lineHeights[key]!

	return (
		obj: Record<
			string,
			{ fontSize: number; leading: number; tracking: number }
		>,
	) => {
		return Object.fromEntries(
			Object.entries(obj).map(([key, { fontSize, tracking, leading }]) => {
				const track = letterSpacing[tracking]!
				const t = ((fontSize / 100) * track) / 16
				return [
					key,
					{
						...createStyleObject({
							fontSize: fontSize,
							leading: multi(fontSize, leading),
							fontMetrics,
						}),
						letterSpacing: `${t}em`,
						fontFamily: fontFamily,
					},
				]
			}),
		)
	}
}
