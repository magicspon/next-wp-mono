import * as React from 'react'
import type { HeroFragment } from '~/schema/generated.graphql'
import { BlockBody } from '../blocks/BlockBody'
import { BlockButtons } from '../blocks/BlockButtons'
import { BlockText } from '../blocks/BlockText'

type TElementProps = React.ComponentProps<'div'>

type THeroTextProps = TElementProps & HeroFragment

export function HeroText({ blocks }: THeroTextProps) {
	return (
		<>
			{blocks.map((block, index) => {
				switch (block.__typename) {
					case 'BaseHeroBlocksBodyLayout':
						return <BlockBody {...block} key={`${block.__typename}-${index}`} />
					case 'BaseHeroBlocksButtonsLayout':
						return (
							<BlockButtons {...block} key={`${block.__typename}-${index}`} />
						)
					case 'BaseHeroBlocksTextLayout':
						return <BlockText {...block} key={`${block.__typename}-${index}`} />
					default:
						return null
				}
			})}
		</>
	)
}
