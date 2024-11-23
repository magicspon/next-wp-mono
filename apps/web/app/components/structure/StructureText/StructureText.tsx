import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BlogTextStructureFragment,
	TextStructureFragment,
} from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

export function StructureText({
	textBlocks,
}: WithPT<TextStructureFragment> | WithPT<BlogTextStructureFragment>) {
	const { blocks } = textBlocks

	return (
		<div data-testid="StructureText">
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'BlogStructureTextBlocksBlocksBodyLayout':
					case 'BaseStructureTextBlocksBlocksBodyLayout':
						return (
							<BlockBody body={block.body} style={block.style} key={index} />
						)
					case 'BlogStructureTextBlocksBlocksButtonsLayout':
					case 'BaseStructureTextBlocksBlocksButtonsLayout':
						return <BlockButtons {...block} key={index} />
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
