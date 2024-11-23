import * as React from 'react'
import { PostFeed } from '~/components/BlogFeed'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type {
	PageFragment,
	TeaserPostFragment,
} from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type TBlogListProps = {
	hero: HeroContent
	structure: StructureProps
	posts: WithPT<TeaserPostFragment>[]
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
