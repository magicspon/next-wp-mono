import * as React from 'react'
import { Slice } from '~/components/Slice'
import type { StructureProps } from '~/utils/parseContent'
import { StructureMixedColumns } from './StructureMixedColumns'
import { StructureText } from './StructureText'
import { StructureTextColumns } from './StructureTextColumns'

type BaseProps = {
	structure: StructureProps
}

export function Structure({ structure }: BaseProps) {
	return (
		<>
			{structure.map((group) => (
				<Slice slice={group.slice} key={group.id}>
					{group.rows.map((block, k) => (
						<React.Fragment key={`${block.__typename}-${k}`}>
							{(() => {
								switch (block.__typename) {
									case 'BaseStructureTextLayout':
										return <StructureText {...block} />
									case 'BaseStructureTextColumnsLayout':
										return <StructureTextColumns {...block} />
									case 'BaseStructureMixedColumnsLayout':
										return <StructureMixedColumns {...block} />
									default:
										return null
								}
							})()}
						</React.Fragment>
					))}
				</Slice>
			))}
		</>
	)
}
