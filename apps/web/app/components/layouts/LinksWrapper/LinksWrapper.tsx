import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const variants = cva('sibling:mb-5', {
	variants: {
		layout: {
			inline: 'flex items-center gap-4',
			stack: 'grid gap-4',
		},
	},
	defaultVariants: {
		layout: 'inline',
	},
})

export type Variants = VariantProps<typeof variants>

type TElementProps = React.ComponentProps<'div'>

export type TLinksWrapperProps = TElementProps & Variants

export function LinksWrapper({
	layout,
	className,
	...props
}: TLinksWrapperProps) {
	return <div className={variants({ layout, className })} {...props} />
}
