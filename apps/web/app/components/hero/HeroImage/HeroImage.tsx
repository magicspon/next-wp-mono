import Image from 'next/image'
import * as React from 'react'
import { Block } from '~/components/blocks/Block'
import type { BaseHeroTextImageLayoutFragment } from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { section } from '~/utils/style/section'

type THeroImageProps = WithPT<BaseHeroTextImageLayoutFragment>

export function HeroImage({ textPanel, image }: THeroImageProps) {
	const { blocks, style } = textPanel
	const hasBlocks = !!blocks?.length

	return (
		<div style={section(style?.section, 'hero')} data-testid="HeroImage">
			<Image {...parseImageProps(image.asset)} />

			{hasBlocks && <Block blocks={blocks} />}
		</div>
	)
}
