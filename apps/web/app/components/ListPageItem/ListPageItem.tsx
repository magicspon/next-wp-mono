import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@spon/ui/primitives/Button'
import { Text } from '@spon/ui/type/Text'
import type {
	TeaserFragment,
	TeaserPageFragment,
} from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { BlockBody } from '../blocks/BlockBody'
import { BlockButtons } from '../blocks/BlockButtons'
import { BlockMarkdown } from '../blocks/BlockMarkdown'
import { BlockText } from '../blocks/BlockText'

type TElementProps = React.ComponentProps<'div'>

type TListPageItemProps = TElementProps &
	Omit<TeaserPageFragment, 'base' | 'id'> & {
		teaser: WithPT<TeaserFragment>
	}

export function ListPageItem({ title, teaser, uri }: TListPageItemProps) {
	const image = teaser.image

	return (
		<div data-testid="ListPageItem">
			<div>{image && <Image {...parseImageProps(image.asset)} />}</div>
			<div data-testid="HeroText">
				<Text>{teaser.title ?? title}</Text>
				{teaser.blocks?.map((block, index) => {
					switch (block.__typename) {
						case 'BaseTeaserBlocksBodyLayout':
							return (
								<BlockBody body={block.body} style={block.style} key={index} />
							)
						case 'BaseTeaserBlocksButtonsLayout':
							return <BlockButtons {...block} key={index} />
						case 'BaseTeaserBlocksMarkdownLayout':
							return (
								<BlockMarkdown
									markdown={block.markdown}
									style={block.style}
									key={index}
								/>
							)
						case 'BaseTeaserBlocksTextLayout':
							return (
								<BlockText text={block.text} style={block.style} key={index} />
							)

						default:
							return null
					}
				})}
				<Button asChild>
					<Link href={uri}>{teaser.cta ?? 'Read more'}</Link>
				</Button>
			</div>
		</div>
	)
}
