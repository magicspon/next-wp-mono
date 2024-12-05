import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@spon/ui/primitives/Button'
import { Text } from '@spon/ui/type/Text'
import { Block } from '~/components/blocks/Block'
import type { BlogTeaserPageFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/ts-helpers'
import * as uri from '~/utils/urls'

type TElementProps = React.ComponentProps<'div'>

type TBlogPostTeaserProps = TElementProps & {
	post: WithPT<BlogTeaserPageFragment>
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
				<Block blocks={teaser.blocks} />
				<Button asChild>
					<Link href={uri.blog(slug)}>{teaser.cta ?? 'Read more'}</Link>
				</Button>
			</div>
		</div>
	)
}
