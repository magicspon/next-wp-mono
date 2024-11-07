import * as React from 'react'
import { Hero } from '~/components/hero'
import type { PageFragment } from '~/schema/generated.graphql'

export function LandingPage({ base }: PageFragment) {
	return (
		<>
			<Hero content={base.hero} />
		</>
	)
}
