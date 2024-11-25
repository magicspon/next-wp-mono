import Image from 'next/image'
import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BaseStructureMixedColumnsLayoutFragment,
	BlogStructureMixedColumnsLayoutFragment,
	ContentMixedColumnsContentImageColumnLayoutFragment,
	ContentMixedColumnsContentTextColumnLayoutFragment,
} from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

function ImageColumn({
	image,
}: ContentMixedColumnsContentImageColumnLayoutFragment) {
	return <Image {...parseImageProps(image.asset)} />
}

function TextColumn({
	textPanel,
}: WithPT<ContentMixedColumnsContentTextColumnLayoutFragment>) {
	const { blocks, style } = textPanel
	console.log('[TextColumn/style]', style)

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
					default:
						return null
				}
			})}
		</>
	)
}

export function StructureMixedColumns({
	columns,
}:
	| WithPT<BlogStructureMixedColumnsLayoutFragment>
	| WithPT<BaseStructureMixedColumnsLayoutFragment>) {
	const { style, content } = columns

	console.log('[StructureMixedColumns/style]', style)

	if (!content) return null

	return (
		<div data-testid="StructureMixedColumns">
			{content.map((column, i) => (
				<React.Fragment key={i}>
					{(() => {
						switch (column?.__typename) {
							case 'ContentMixedColumnsContentImageColumnLayout':
								return <ImageColumn {...column} />
							case 'ContentMixedColumnsContentTextColumnLayout':
								return <TextColumn {...column} />
							default:
								return null
						}
					})()}
				</React.Fragment>
			))}
		</div>
	)
}
