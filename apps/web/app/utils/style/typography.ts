import type {
	BlocksTextStylesFragment,
	TypographyFragment,
} from '~/schema/generated.graphql'
import type { RemoveTypename } from '../ts-helpers'
import {
	createColors,
	createScale,
	createStyleFromGraphql,
} from './createStyleFromGql'

export function typography(input: TypographyFragment): {
	vars: React.CSSProperties
} {
	if (!input)
		return {
			vars: {},
		}

	const { theme, textAlign, scale } = input

	const vars = {
		...createColors(theme),
		...createScale(scale),
		...createStyleFromGraphql(textAlign),
	}

	return {
		vars,
	}
}

export function findFontSize(
	target: string,
	style?: RemoveTypename<BlocksTextStylesFragment>,
) {
	if (!style) return undefined

	return style.typography.textSizes.find(({ style }) => style[0] === target)
		?.fontSize
}

export function getTextStyles(
	style?: RemoveTypename<BlocksTextStylesFragment>,
) {
	if (!style) return undefined

	return style.typography.textSizes.reduce<Record<string, string>>(
		(acc, curr) => {
			const {
				style: [style],
				fontSize: [fontSize],
			} = curr

			if (!style || !fontSize) return acc

			acc[style] = fontSize

			return acc
		},
		{},
	)
}
