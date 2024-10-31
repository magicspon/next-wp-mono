import { type VariantProps, cva } from 'class-variance-authority'
import Image from 'next/image'
import * as React from 'react'
import type { TMediaSelection } from '@spon/cms/queries/fragments/content/media.fragment'
import type { TImageSelection } from '@spon/cms/queries/fragments/image.fragment'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { imageProps } from '~/utils/imageProps'

export const asset = cva(null, {
	variants: {
		variant: {
			home: '',
		},
		component: {
			blocks: '',
			related: '',
		},
		layout: {
			banner: '',
			card: 'w-full aspect-[16/14] object-cover',
			block: '',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

export type Variants = VariantProps<typeof asset>

export function Asset({
	assets,
	layout,
	variant,
	component,
}: NonNullable<TMediaSelection> & Variants) {
	const image = getFirstOrNull(assets)

	if (!image) return null

	// this type is annoying, it has a possible
	// Record<string, never> value that shouldn't exist
	return (
		<Image
			{...imageProps(image as TImageSelection)}
			className={asset({ layout, variant, component })}
		/>
	)
}
