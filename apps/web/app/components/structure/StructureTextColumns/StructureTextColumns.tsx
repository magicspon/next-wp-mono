import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BaseStructureTextColumnsLayoutFragment,
	BlogStructureTextColumnsLayoutFragment,
	ContentColumnsBlocksTextPanelFragment,
} from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

function Column({
	column,
}: {
	column: WithPT<ContentColumnsBlocksTextPanelFragment>
}) {
	const { blocks, style } = column

	console.log({ '[Column/style]': style })

	return (
		<>
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'ComponentsTextPanelBlocksBodyLayout':
						return (
							<BlockBody body={block.body} style={block.style} key={index} />
						)
					case 'ComponentsTextPanelBlocksButtonsLayout':
						return <BlockButtons {...block} key={index} />
					case 'ComponentsTextPanelBlocksTextLayout':
						return (
							<BlockText text={block.text} style={block.style} key={index} />
						)
					case 'ComponentsTextPanelBlocksMarkdownLayout':
						return (
							<BlockMarkdown
								markdown={block.markdown}
								style={block.style}
								key={index}
							/>
						)
					default:
						return null
				}
			})}
		</>
	)
}

export function StructureTextColumns({
	columns,
}:
	| WithPT<BaseStructureTextColumnsLayoutFragment>
	| WithPT<BlogStructureTextColumnsLayoutFragment>) {
	const { style, blocks } = columns

	const textColumns = blocks?.map((c) => c.textPanel)

	if (!textColumns) return null

	console.log({ '[StructureTextColumns/style]': style })

	return (
		<div data-testid="StructureTextColumns">
			{textColumns.map((column, i) => (
				<Column key={i} column={column} />
			))}
		</div>
	)
}
