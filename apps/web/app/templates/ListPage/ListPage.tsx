import * as React from 'react'
import { ListPageItem } from '~/components/ListPageItem'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type {
	PageFragment,
	TeaserPageFragment,
} from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/ts-helpers'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type BaseProps = {
	hero: HeroContent
	structure: StructureProps
	pages: WithPT<TeaserPageFragment>[]
}

export function ListPage({ hero, structure, pages }: BaseProps) {
	return (
		<>
			<Hero content={hero} />

			{pages.map((page) => (
				<ListPageItem
					key={page.id}
					teaser={page.base.teaser}
					title={page.title}
					uri={page.uri}
				/>
			))}

			<Structure structure={structure} />
		</>
	)
}
