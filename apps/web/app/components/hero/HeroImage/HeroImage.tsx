import * as React from 'react'
import type { HeroImageFragment } from '~/schema/generated.graphql'
import { BlockBody } from '../blocks/BlockBody'
import { BlockButtons } from '../blocks/BlockButtons'
import { BlockText } from '../blocks/BlockText'

type TElementProps = React.ComponentProps<'div'>

type THeroImageProps = TElementProps & HeroImageFragment

export function HeroImage({ blocks, image }: THeroImageProps) {
	return (
		<>
			<pre>{JSON.stringify(image, null, 2)}</pre>
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'BaseHeroBlocksBodyLayout':
						return <BlockBody {...block} key={index} />
					case 'BaseHeroBlocksButtonsLayout':
						return <BlockButtons {...block} key={index} />
					case 'BaseHeroBlocksTextLayout':
						return <BlockText {...block} key={index} />
					default:
						return null
				}
			})}
		</>
	)
}
