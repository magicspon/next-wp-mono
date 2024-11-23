import Image from 'next/image'
import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BlogImageMixedColumnFragment,
	BlogMixedColumnsStructureFragment,
	BlogTextMixedColumnFragment,
	ImageMixedColumnFragment,
	MixedColumnsStructureFragment,
	TextMixedColumnFragment,
} from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

function ImageColumn({
	image,
}: ImageMixedColumnFragment | BlogImageMixedColumnFragment) {
	return <Image {...parseImageProps(image.asset)} />
}

function TextColumn({
	textPanel,
}: WithPT<TextMixedColumnFragment> | WithPT<BlogTextMixedColumnFragment>) {
	const { blocks } = textPanel

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
	| WithPT<MixedColumnsStructureFragment>
	| WithPT<BlogMixedColumnsStructureFragment>) {
	return (
		<div data-testid="StructureMixedColumns">
			{columns.map((column, i) => (
				<React.Fragment key={i}>
					{(() => {
						switch (column?.__typename) {
							case 'BaseStructureMixedColumnsImageColumnLayout':
							case 'BlogStructureMixedColumnsImageColumnLayout':
								return <ImageColumn {...column} />
							case 'BaseStructureMixedColumnsTextColumnLayout':
							case 'BlogStructureMixedColumnsTextColumnLayout':
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
