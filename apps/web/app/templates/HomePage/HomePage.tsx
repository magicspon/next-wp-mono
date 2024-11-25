import * as React from 'react'
import { Grid } from '@spon/ui/layout/Grid'
import { BlogPostTeaser } from '~/components/blog/BlogPostTeaser'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type {
	BlogTeaserPageFragment,
	PageFragment,
} from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type BaseProps = {
	hero: HeroContent
	structure: StructureProps
	posts?: WithPT<BlogTeaserPageFragment>[]
}

export function HomePage({ hero, structure, posts }: BaseProps) {
	return (
		<>
			<Hero content={hero} />
			<Structure structure={structure} />

			{posts && (
				<Grid columns="blog">
					{posts.map((post) => (
						<BlogPostTeaser key={post.id} post={post} />
					))}
				</Grid>
			)}
		</>
	)
}
