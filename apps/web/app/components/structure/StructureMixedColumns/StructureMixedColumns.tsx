import Image from 'next/image'
import * as React from 'react'
import { TextPanelBox } from '~/components/TextPanelBox'
import { Block } from '~/components/blocks/Block'
import type {
	BaseStructureMixedColumnsLayoutFragment,
	BlogStructureMixedColumnsLayoutFragment,
	ContentMixedColumnsContentImageColumnLayoutFragment,
	ContentMixedColumnsContentTextColumnLayoutFragment,
} from '~/schema/generated.graphql'
import { parseImageProps } from '~/utils/imageProps'
import { group } from '~/utils/style/group'
import type { WithPT } from '~/utils/ts-helpers'

function ImageColumn({
	image,
}: ContentMixedColumnsContentImageColumnLayoutFragment) {
	return <Image {...parseImageProps(image.asset)} />
}

function TextColumn({
	textPanel,
}: WithPT<ContentMixedColumnsContentTextColumnLayoutFragment>) {
	const { blocks, style } = textPanel
	console.log('[TextColumn/style]', style)

	return (
		<TextPanelBox theme={style.section}>
			<Block blocks={blocks} />
		</TextPanelBox>
	)
}

export function StructureMixedColumns({
	columns,
}:
	| WithPT<BlogStructureMixedColumnsLayoutFragment>
	| WithPT<BaseStructureMixedColumnsLayoutFragment>) {
	const { style, content } = columns

	console.log('[StructureMixedColumns/style]', style)

	if (!content) return null

	return (
		<div style={group(style.group)} data-testid="StructureMixedColumns">
			{content.map((column, i) => (
				<React.Fragment key={i}>
					{(() => {
						switch (column?.__typename) {
							case 'ContentMixedColumnsContentImageColumnLayout':
								return <ImageColumn {...column} />
							case 'ContentMixedColumnsContentTextColumnLayout':
								return <TextColumn {...column} />
							default:
								return null
						}
					})()}
				</React.Fragment>
			))}
		</div>
	)
}
