import * as React from 'react'
import { Hero } from '~/components/hero'
import { Structure } from '~/components/structure'
import type { PageFragment } from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/ts-helpers'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type BaseProps = {
	hero: HeroContent
	structure: StructureProps
}

export function LandingPage({ hero, structure }: BaseProps) {
	return (
		<>
			<Hero content={hero} />
			<Structure structure={structure} />
		</>
	)
}
