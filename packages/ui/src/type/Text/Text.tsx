import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import type { RecipeVariantProps } from '@spon/styled-system/css'
import { cva, cx } from '@spon/styled-system/css'
import { styled } from '@spon/styled-system/jsx'

const text = cva({
	variants: {
		size: {
			1: {},
			2: {},
			3: {},
			4: {},
			5: {},
			6: {},
			7: {},
			8: {},
			9: {},
		},

		family: {
			heading: {
				fontFamily: 'heading',
			},
			body: {
				fontFamily: 'body',
			},
		},
	},
	compoundVariants: [
		{ size: 1, family: 'body', css: { textStyle: 'body/1' } },
		{ size: 2, family: 'body', css: { textStyle: 'body/2' } },
		{ size: 3, family: 'body', css: { textStyle: 'body/3' } },
		{ size: 4, family: 'body', css: { textStyle: 'body/4' } },
		{ size: 5, family: 'body', css: { textStyle: 'body/5' } },
		{ size: 6, family: 'body', css: { textStyle: 'body/6' } },
		{ size: 7, family: 'body', css: { textStyle: 'body/7' } },
		{ size: 8, family: 'body', css: { textStyle: 'body/8' } },
		{ size: 9, family: 'body', css: { textStyle: 'body/9' } },
		{ size: 1, family: 'heading', css: { textStyle: 'heading/1' } },
		{ size: 2, family: 'heading', css: { textStyle: 'heading/2' } },
		{ size: 3, family: 'heading', css: { textStyle: 'heading/3' } },
		{ size: 4, family: 'heading', css: { textStyle: 'heading/4' } },
		{ size: 5, family: 'heading', css: { textStyle: 'heading/5' } },
		{ size: 6, family: 'heading', css: { textStyle: 'heading/6' } },
		{ size: 7, family: 'heading', css: { textStyle: 'heading/7' } },
		{ size: 8, family: 'heading', css: { textStyle: 'heading/8' } },
		{ size: 9, family: 'heading', css: { textStyle: 'heading/9' } },
	],
})

export type TMergeMergeProps<T> = T & TStyleProps & TCombinedProps

export type TStyleProps = RecipeVariantProps<typeof text>

export type TElementProps = React.ComponentProps<typeof styled.p>

export type TElementRef = React.ElementRef<
	'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
>

export type TCombinedProps = TElementProps &
	TStyleProps & {
		asChild?: boolean
	}

const StyledSlot = styled(Slot)

export const Text = React.forwardRef<TElementRef, TCombinedProps>(function Text(
	{ asChild, className, ...props },
	ref,
) {
	const Comp = asChild ? StyledSlot : styled.p
	const [variantProps, localProps] = text.splitVariantProps(props)

	return (
		<Comp
			className={cx(className, text(variantProps))}
			ref={ref}
			{...localProps}
		/>
	)
})
