import * as React from 'react'
import { Block } from '~/components/blocks/Block'
import type {
	BaseStructureTextLayoutFragment,
	BlogStructureTextLayoutFragment,
} from '~/schema/generated.graphql'
import { section } from '~/utils/style/section'
import type { WithPT } from '~/utils/ts-helpers'

export function StructureText({
	textBlocks,
}:
	| WithPT<BaseStructureTextLayoutFragment>
	| WithPT<BlogStructureTextLayoutFragment>) {
	const { blocks } = textBlocks

	return (
		<div style={section(textBlocks?.section)} data-testid="StructureText">
			<Block blocks={blocks} />
		</div>
	)
}
