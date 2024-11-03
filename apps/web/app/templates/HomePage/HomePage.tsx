import * as React from 'react'
import type { HomePageFragment } from '~/schema/generated.graphql'

export function HomePage({ content, title, flexibleHero }: HomePageFragment) {
	return (
		<div>
			<pre>{JSON.stringify({ content, title, flexibleHero }, null, 2)}</pre>
		</div>
	)
}
