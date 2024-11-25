import type { FontSizeToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import type { TypographyFragment } from '~/schema/generated.graphql'

export function typography(input: TypographyFragment) {
	if (!input) return

	const { textSizes } = input

	const fontSizes = textSizes?.reduce<Record<string, string>>((acc, s) => {
		const {
			style: [style],
			fontSize: [fontSize],
		} = s

		acc[`--font-size-${style}`] = token(
			`fontSizes.${fontSize as FontSizeToken}`,
		)

		return acc
	}, {})

	return {
		...fontSizes,
	}
}
