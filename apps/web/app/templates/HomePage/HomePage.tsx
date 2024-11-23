import * as React from 'react'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type { PageFragment } from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type BaseProps = {
	hero: HeroContent
	structure: StructureProps
}

export function HomePage({ hero, structure }: BaseProps) {
	return (
		<>
			<Hero content={hero} />
			<Structure structure={structure} />
		</>
	)
}
