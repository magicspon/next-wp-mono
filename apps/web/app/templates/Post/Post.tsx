import * as React from 'react'
import type { PostFragment } from '~/schema/generated.graphql'

export function Post({ content, title }: PostFragment) {
	return <pre>{JSON.stringify({ content, title }, null, 2)}</pre>
}
