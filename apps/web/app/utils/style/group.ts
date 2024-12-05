import type { SpacingToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import type {
	ContentColumnsStyleGroupFragment,
	ContentMixedColumnsStyleGroupFragment,
} from '~/schema/generated.graphql'
import { createStyleFromGraphql } from './createStyleFromGql'

export type TSectionStyle =
	| ContentMixedColumnsStyleGroupFragment
	| ContentColumnsStyleGroupFragment

export function group(input?: TSectionStyle, namespace?: string) {
	if (!input) return
	const spacing = input.box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		acc[`--${attribute}`] = token(`spacing.${spacing as SpacingToken}`)

		return acc
	}, {})
	const align = createStyleFromGraphql(input?.align, namespace)
	const justify = createStyleFromGraphql(input?.justify, namespace)
	const flexDirection = createStyleFromGraphql(input?.flexDirection, namespace)

	return {
		...spacing,
		...align,
		...justify,
		...flexDirection,
	}
}
