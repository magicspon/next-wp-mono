import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type { TextStructureFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

export function StructureText({ textBlocks }: WithPT<TextStructureFragment>) {
	const { blocks } = textBlocks

	return (
		<div data-testid="StructureText">
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'BaseStructureTextBlocksBlocksBodyLayout':
						return (
							<BlockBody body={block.body} style={block.style} key={index} />
						)
					case 'BaseStructureTextBlocksBlocksButtonsLayout':
						return <BlockButtons {...block} key={index} />
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
