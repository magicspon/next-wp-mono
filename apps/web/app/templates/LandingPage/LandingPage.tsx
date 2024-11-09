import * as React from 'react'
import { Hero } from '~/components/hero'
import type { PageFragment } from '~/schema/generated.graphql'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'

type BaseProps = WithPortableText<Pick<PageFragment, 'base'>>

export function LandingPage({ base }: BaseProps) {
	return (
		<>
			<Hero content={base.hero} />
			{/* <PortableText value={content} /> */}
		</>
	)
}
