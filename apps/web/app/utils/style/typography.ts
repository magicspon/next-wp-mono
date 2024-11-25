import type { FontSizeToken, FontToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import type { TypographyFragment } from '~/schema/generated.graphql'
import { createColors, createStyleFromGraphql } from './createStyleFromGql'

export function typography(input: TypographyFragment): {
	vars: React.CSSProperties
	fontFamily: FontToken
} {
	if (!input)
		return {
			vars: {},
			fontFamily: 'body',
		}

	const { textSizes, theme, textAlign, fontFamily } = input

	const fontSizes = textSizes?.reduce<Record<string, string>>((acc, s) => {
		const {
			style: [style],
			fontSize: [fontSize],
		} = s

		acc[`--${style}`] = token(`fontSizes.${fontSize as FontSizeToken}`)

		return acc
	}, {})

	const vars = {
		...fontSizes,
		...createColors(theme),
		...createStyleFromGraphql(textAlign),
	}

	const font = getFirstOrNull(fontFamily)

	return {
		vars,
		fontFamily: (font ?? 'body') as FontToken,
	}
}
