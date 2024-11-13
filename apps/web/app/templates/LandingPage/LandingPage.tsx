import * as React from 'react'
import { Slice } from '~/components/Slice'
import { Hero } from '~/components/hero'
import { StructureMixedColumns } from '~/components/structure/StructureMixedColumns'
import { StructureText } from '~/components/structure/StructureText'
import { StructureTextColumns } from '~/components/structure/StructureTextColumns'
import type { PageFragment } from '~/schema/generated.graphql'
import type { StructureProps } from '~/utils/parseContent'
import type { WithPT } from '~/utils/portable/htmlToPortableText'

type BaseInputProps = Pick<PageFragment, 'base'>

type HeroContent = WithPT<BaseInputProps['base']['hero']>

type BaseProps = {
	hero: HeroContent
	structure: StructureProps
}

export function LandingPage({ hero, structure }: BaseProps) {
	return (
		<>
			<Hero content={hero} />
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
