import * as React from 'react'
import { TextPanelBox } from '~/components/TextPanelBox'
// import { Debug } from '~/components/Debug'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroTextLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type THeroTextProps = WithPT<BaseHeroTextLayoutFragment>

export function HeroText({ textPanel }: THeroTextProps) {
	const { blocks, style } = textPanel

	return (
		<TextPanelBox theme={style?.section}>
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'ComponentsTextPanelBlocksBodyLayout':
						return (
							<BlockBody body={block.body} style={block.style} key={index} />
						)
					case 'ComponentsTextPanelBlocksButtonsLayout':
						return <BlockButtons {...block} key={index} />
					case 'ComponentsTextPanelBlocksMarkdownLayout':
						return (
							<BlockMarkdown
								markdown={block.markdown}
								style={block.style}
								key={index}
							/>
						)
					case 'ComponentsTextPanelBlocksTextLayout':
						return (
							<BlockText text={block.text} style={block.style} key={index} />
						)

					default:
						return null
				}
			})}
		</TextPanelBox>
	)
}
