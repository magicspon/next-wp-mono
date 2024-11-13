import * as React from 'react'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import type { BaseHeroFragment } from '~/schema/generated.graphql'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'
import { HeroImage } from './HeroImage'
import { HeroText } from './HeroText'

type THeroProps = { content: WithPortableText<BaseHeroFragment[]> }

export function Hero({ content }: THeroProps) {
	const hero = getFirstOrNull(content)

	console.log({ hero })

	if (!hero) return null

	// const { textPanel,  } = data
	// const block = getFirstOrNull(data)

	return (
		<>
			{(() => {
				switch (hero?.__typename) {
					case 'BaseHeroTextImageLayout':
						return <HeroImage {...hero} />
					case 'BaseHeroTextLayout':
						return <HeroText {...hero} />
					default:
						return null
				}
			})()}
		</>
	)
}
