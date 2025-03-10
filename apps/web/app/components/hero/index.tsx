import * as React from 'react'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import type { BaseHeroFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/ts-helpers'
import { HeroImage } from './HeroImage'
import { HeroText } from './HeroText'

type THeroProps = { content: WithPT<BaseHeroFragment[]> }

export function Hero({ content }: THeroProps) {
	const hero = getFirstOrNull(content)

	if (!hero) return null

	switch (hero?.__typename) {
		case 'BaseHeroTextImageLayout':
			return <HeroImage {...hero} />
		case 'BaseHeroTextLayout':
			return <HeroText {...hero} />
		default:
			return null
	}
}
