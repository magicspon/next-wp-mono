import * as React from 'react'
import type { StructureProps } from '~/utils/parseContent'
import { Slice } from './Slice'
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
				<Slice slice={group.slice?.section} key={group.id}>
					{group.rows.map((block, k) => (
						<React.Fragment key={`${block.__typename}-${k}`}>
							{(() => {
								switch (block.__typename) {
									case 'BlogStructureTextLayout':
									case 'BaseStructureTextLayout':
										return <StructureText {...block} />
									case 'BaseStructureTextColumnsLayout':
									case 'BlogStructureTextColumnsLayout':
										return <StructureTextColumns {...block} />
									case 'BaseStructureMixedColumnsLayout':
									case 'BlogStructureMixedColumnsLayout':
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
