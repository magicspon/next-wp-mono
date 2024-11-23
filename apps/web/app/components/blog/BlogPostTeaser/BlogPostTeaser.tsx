import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@spon/ui/primitives/Button'
import { Text } from '@spon/ui/type/Text'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { TeaserPostFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import * as uri from '~/utils/urls'

type TElementProps = React.ComponentProps<'div'>

type TBlogPostTeaserProps = TElementProps & {
	post: WithPT<TeaserPostFragment>
}

export function BlogPostTeaser({ post }: TBlogPostTeaserProps) {
	const { title, slug, blog } = post

	const { teaser } = blog
	return (
		<div data-testid="BlogPostTeaser">
			<div>
				{teaser.image?.asset && (
					<Image {...parseImageProps(teaser.image.asset)} />
				)}
			</div>
			<div data-testid="Post">
				<Text>{title}</Text>
				{teaser.blocks?.map((block, index) => {
					switch (block.__typename) {
						case 'BlogTeaserBlocksBodyLayout':
							return (
								<BlockBody body={block.body} style={block.style} key={index} />
							)
						case 'BlogTeaserBlocksButtonsLayout':
							return <BlockButtons {...block} key={index} />
						case 'BlogTeaserBlocksMarkdownLayout':
							return (
								<BlockMarkdown
									markdown={block.markdown}
									style={block.style}
									key={index}
								/>
							)
						case 'BlogTeaserBlocksTextLayout':
							return (
								<BlockText text={block.text} style={block.style} key={index} />
							)

						default:
							return null
					}
				})}
				<Button asChild>
					<Link href={uri.blog(slug)}>{teaser.cta ?? 'Read more'}</Link>
				</Button>
			</div>
		</div>
	)
}
