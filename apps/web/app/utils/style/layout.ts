import type { ContentBlocksLayoutFragment } from '~/schema/generated.graphql'
import { createSpacing, createStyleFromGraphql } from './createStyleFromGql'

export type TSectionStyle = ContentBlocksLayoutFragment

export function layout(input?: TSectionStyle, prefix?: string) {
	if (!input) return

	return {
		...createSpacing(input?.box, prefix),
		...createStyleFromGraphql(input?.align, prefix),
	}
}
