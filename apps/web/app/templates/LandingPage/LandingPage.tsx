import * as React from 'react'
import { Hero } from '~/components/hero'
import { StructureMixedColumns } from '~/components/structure/StructureMixedColumns'
import { StructureText } from '~/components/structure/StructureText'
import { StructureTextColumns } from '~/components/structure/StructureTextColumns'
import type { PageFragment } from '~/schema/generated.graphql'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'

type BaseProps = WithPortableText<Pick<PageFragment, 'base'>>

export function LandingPage({ base }: BaseProps) {
	const { hero, structure } = base

	return (
		<>
			<Hero content={hero} />
			{structure.map((block, i) => (
				<React.Fragment key={`${block.__typename}-${i}`}>
					{(() => {
						switch (block?.__typename) {
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
		</>
	)
}
