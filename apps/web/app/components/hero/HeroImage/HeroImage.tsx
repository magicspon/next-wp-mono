import Image from 'next/image'
import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroImageTextFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'

type THeroImageProps = WithPortableText<BaseHeroImageTextFragment>

export function HeroImage({ textPanel, image }: THeroImageProps) {
	return (
		<div data-testid="HeroImage">
			<Image {...parseImageProps(image.asset)} />
			{textPanel.blocks?.map((block, index) => {
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
		</div>
	)
}
