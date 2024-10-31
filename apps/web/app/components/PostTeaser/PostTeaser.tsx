import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import type { TTeaserSelection } from '@spon/cms/queries/selection/post.selection'
import { Column } from '@spon/ui/layout/Column'
import { Button } from '@spon/ui/primitives/Button'
import { Heading } from '@spon/ui/type/Heading'
import { imageProps } from '~/utils/imageProps'

type TElementProps = React.ComponentProps<'div'>

type TPostTeaserProps = TElementProps & Omit<TTeaserSelection, '_type'>

export function PostTeaser({
	title,
	slug,
	teaser: { image },
}: TPostTeaserProps) {
	return (
		<Column className="items-start gap-4">
			{image && <Image {...imageProps(image)} />}
			<Heading intent="h4">{title}</Heading>
			<Button className="mt-auto" variant="link" size="none" asChild>
				<Link href={`/blog/${slug}`}>Read me</Link>
			</Button>
		</Column>
	)
}
