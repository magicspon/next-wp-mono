'use client'

import * as React from 'react'
import { Grid } from '@spon/ui/layout/Grid'
import { Inline } from '@spon/ui/layout/Inline'
import { Stack } from '@spon/ui/layout/Stack'
import { Button } from '@spon/ui/primitives/Button'
import { BlogPostTeaser } from '~/components/blog/BlogPostTeaser'
import { useInfinitePosts } from '~/hooks/useInfinitePosts'
import type { BlogTeaserPageFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/ts-helpers'

type TElementProps = React.ComponentProps<'div'>

type TPostFeedProps = TElementProps & {
	posts: WithPT<BlogTeaserPageFragment>[]
	cursor?: string
}

export function PostFeed({ posts, cursor }: TPostFeedProps) {
	const { entries, fetchNextPage, hasNextPage, isFetching } = useInfinitePosts({
		posts,
		cursor,
	})

	return (
		<Stack className="gap-12">
			<Grid columns="blog">
				{entries.map((post) => (
					<BlogPostTeaser key={post.id} post={post} />
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
