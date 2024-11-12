import Image from 'next/image'
import * as React from 'react'
import type { BaseHeroImageTextFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'
import { BlockBody } from '../blocks/BlockBody'
import { BlockButtons } from '../blocks/BlockButtons'
import { BlockText } from '../blocks/BlockText'

type THeroImageProps = WithPortableText<BaseHeroImageTextFragment>

export function HeroImage({ textPanel, image }: THeroImageProps) {
	return (
		<>
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
		</>
	)
}
