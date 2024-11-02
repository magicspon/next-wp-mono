import * as React from 'react'
import type { PageFragment } from '~/schema/generated.graphql'

export function LandingPage({ content, title }: PageFragment) {
	return <pre>{JSON.stringify({ content, title }, null, 2)}</pre>
}
