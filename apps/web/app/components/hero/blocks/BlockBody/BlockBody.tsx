import type { BlocksBodyFragment } from '~/schema/generated.graphql'

export function BlockBody({ body }: BlocksBodyFragment) {
	return <div dangerouslySetInnerHTML={{ __html: body }} />
}
