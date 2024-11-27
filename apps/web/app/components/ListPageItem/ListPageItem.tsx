import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@spon/ui/primitives/Button'
import { Text } from '@spon/ui/type/Text'
import type {
	BaseTeaserFragment,
	TeaserPageFragment,
} from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/ts-helpers'
import { Block } from '../blocks/Block'

type TElementProps = React.ComponentProps<'div'>

type TListPageItemProps = TElementProps &
	Omit<TeaserPageFragment, 'base' | 'id'> & {
		teaser: WithPT<BaseTeaserFragment>
	}

export function ListPageItem({ title, teaser, uri }: TListPageItemProps) {
	const image = teaser.image

	return (
		<div data-testid="ListPageItem">
			<div>{image && <Image {...parseImageProps(image.asset)} />}</div>
			<div data-testid="RichText">
				<Text>{teaser.title ?? title}</Text>
				<Block blocks={teaser.blocks} />

				<Button asChild>
					<Link href={uri}>{teaser.cta ?? 'Read more'}</Link>
				</Button>
			</div>
		</div>
	)
}
