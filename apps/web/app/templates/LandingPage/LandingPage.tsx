import * as React from 'react'
import { Hero } from '~/components/hero'
import type { PageFragment } from '~/schema/generated.graphql'

export function LandingPage({ base }: Pick<PageFragment, 'base'>) {
	return (
		<>
			<Hero content={base.hero} />
			{/* <PortableText value={content} /> */}
		</>
	)
}
