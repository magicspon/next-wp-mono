import * as React from 'react'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroTextFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type THeroTextProps = WithPT<BaseHeroTextFragment>

export function HeroText({ textPanel }: THeroTextProps) {
	const { blocks } = textPanel

	return (
		<div data-testid="HeroText">
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
		</div>
	)
}
