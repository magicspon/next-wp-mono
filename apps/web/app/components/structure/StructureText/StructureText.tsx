import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BaseStructureTextLayoutFragment,
	BlogStructureTextLayoutFragment,
} from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { section } from '~/utils/style/section'

export function StructureText({
	textBlocks,
}:
	| WithPT<BaseStructureTextLayoutFragment>
	| WithPT<BlogStructureTextLayoutFragment>) {
	const { blocks } = textBlocks

	return (
		<div style={section(textBlocks?.section)} data-testid="StructureText">
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'BlogStructureTextBlocksBlocksBodyLayout':
					case 'BaseStructureTextBlocksBlocksBodyLayout':
						return (
							<BlockBody body={block.body} style={block.style} key={index} />
						)
					case 'BlogStructureTextBlocksBlocksButtonsLayout':
					case 'BaseStructureTextBlocksBlocksButtonsLayout':
						return <BlockButtons buttons={block.buttons} key={index} />
					case 'BlogStructureTextBlocksBlocksTextLayout':
					case 'BaseStructureTextBlocksBlocksTextLayout':
						return (
							<BlockText text={block.text} style={block.style} key={index} />
						)
					default:
						return null
				}
			})}
		</div>
	)
}
