import * as React from 'react'
import { Structure } from '~/components/structure'
import type { StructureProps } from '~/utils/parseContent'

type BaseProps = {
	structure: StructureProps
}

export function Post({ structure }: BaseProps) {
	return (
		<>
			<Structure structure={structure} />
		</>
	)
}
