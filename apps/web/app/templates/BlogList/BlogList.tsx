import * as React from 'react'
import type {
	BlogPageFragment,
	TeaserFragment,
} from '~/schema/generated.graphql'

type TBlogListProps = {
	posts: TeaserFragment[]
	page: BlogPageFragment
}

export function BlogList({ page, posts }: TBlogListProps) {
	return <pre>{JSON.stringify({ page, posts }, null, 2)}</pre>
}
