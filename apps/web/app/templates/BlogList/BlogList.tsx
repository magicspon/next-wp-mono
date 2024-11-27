import * as React from 'react'
import { PostFeed } from '~/components/blog/BlogFeed'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type {
	BlogTeaserPageFragment,
	PageFragment,
} from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/ts-helpers'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type TBlogListProps = {
	hero: HeroContent
	structure: StructureProps
	posts: WithPT<BlogTeaserPageFragment>[]
	cursor?: string
}

export function BlogList({ posts, hero, structure, cursor }: TBlogListProps) {
	return (
		<>
			<Hero content={hero} />
			<PostFeed posts={posts} cursor={cursor} />
			<Structure structure={structure} />
		</>
	)
}
