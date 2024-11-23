import * as React from 'react'
import { Debug } from '~/components/Debug'
import { Structure } from '~/components/structure'
import type { StructureProps } from '~/utils/parseContent'

type BaseProps = {
	structure: StructureProps
}

export function Post({ structure }: BaseProps) {
	return (
		<>
			<Debug structure={structure} render />
			<Structure structure={structure} />
		</>
	)
}
