'use client'

import * as React from 'react'
import type { TTeaserSelection } from '@spon/cms/queries/selection/post.selection'
import { PER_PAGE } from '@spon/cms/queries/utils/constants'
import { Grid } from '@spon/ui/layout/Grid'
import { Inline } from '@spon/ui/layout/Inline'
import { Stack } from '@spon/ui/layout/Stack'
import { Button } from '@spon/ui/primitives/Button'
import { useInfinitePosts } from '~/hooks/useInfinitePosts'
import { PostTeaser } from '../PostTeaser'

type TElementProps = React.ComponentProps<'div'>

type TPostFeedProps = TElementProps & {
	posts: TTeaserSelection[]
	total: number
}

export function PostFeed({ posts, total }: TPostFeedProps) {
	const { entries, fetchNextPage, hasNextPage, isFetching } = useInfinitePosts({
		posts,
		total,
		count: PER_PAGE,
	})

	return (
		<Stack className="gap-12">
			<Grid columns="blog">
				{entries.map((post) => (
					<PostTeaser key={post._id} {...post} />
				))}
			</Grid>
			{hasNextPage && (
				<Inline className="justify-center">
					<Button disabled={isFetching} onClick={() => fetchNextPage()}>
						Load more
					</Button>
				</Inline>
			)}
		</Stack>
	)
}
