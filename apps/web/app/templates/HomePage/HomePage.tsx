import * as React from 'react'
import type { HomePageFragment } from '~/schema/graphql'

export function HomePage({ content, title }: HomePageFragment) {
	return (
		<div>
			<pre>{JSON.stringify({ content, title }, null, 2)}</pre>
		</div>
	)
}
