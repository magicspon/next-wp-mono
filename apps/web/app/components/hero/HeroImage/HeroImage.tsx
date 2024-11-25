import Image from 'next/image'
import * as React from 'react'
import { TextPanelBox } from '~/components/TextPanelBox'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroTextImageLayoutFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type THeroImageProps = WithPT<BaseHeroTextImageLayoutFragment>

export function HeroImage({ textPanel, image }: THeroImageProps) {
	const { blocks, style } = textPanel
	const hasBlocks = !!blocks?.length

	return (
		<div data-testid="HeroImage">
			<Image {...parseImageProps(image.asset)} />

			{hasBlocks && (
				<TextPanelBox theme={style.section}>
					{blocks.map((block, index) => {
						switch (block.__typename) {
							case 'ComponentsTextPanelBlocksBodyLayout':
								return (
									<BlockBody
										body={block.body}
										textStyles={block.textStyles}
										key={index}
									/>
								)
							case 'ComponentsTextPanelBlocksButtonsLayout':
								return <BlockButtons {...block} key={index} />
							case 'ComponentsTextPanelBlocksMarkdownLayout':
								return (
									<BlockMarkdown
										markdown={block.markdown}
										textStyles={block.textStyles}
										key={index}
									/>
								)
							case 'ComponentsTextPanelBlocksTextLayout':
								return (
									<BlockText
										text={block.text}
										textStyles={block.textStyles}
										key={index}
									/>
								)
							default:
								return null
						}
					})}
				</TextPanelBox>
			)}
		</div>
	)
}
