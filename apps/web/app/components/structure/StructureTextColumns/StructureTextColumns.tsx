import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type { TextColumnsStructureFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

export function StructureTextColumns({
	columns,
}: WithPT<TextColumnsStructureFragment>) {
	const textColumns = columns.map((c) => c.textPanel)

	return (
		<div data-testid="StructureTextColumns">
			{textColumns.map((panel, i) => (
				<div key={i}>
					{panel.blocks?.map((block, index) => {
						switch (block.__typename) {
							case 'ComponentsTextPanelBlocksBodyLayout':
								return (
									<BlockBody
										body={block.body}
										style={block.style}
										key={index}
									/>
								)
							case 'ComponentsTextPanelBlocksButtonsLayout':
								return <BlockButtons {...block} key={index} />
							case 'ComponentsTextPanelBlocksTextLayout':
								return (
									<BlockText
										text={block.text}
										style={block.style}
										key={index}
									/>
								)
							default:
								return null
						}
					})}
				</div>
			))}
		</div>
	)
}
