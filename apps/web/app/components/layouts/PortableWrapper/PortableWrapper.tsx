import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'
import type { TTheme } from '@spon/cms/queries/fragments/theme.fragment'
import { Palette } from '~/components/Palette'

/**
 * @function Root
 * Root  blocks wrapper style
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

const variants = cva(null, {
	variants: {
		variant: {
			default: '',
			center: '',
			split: '',
			banner: '',
		},
		contain: {
			default: 'w-full max-w-7xl mx-auto child:max-w-3xl px-8',
			screen: 'w-full px-8',
			large: 'w-full max-w-4xl mx-auto',
			small: 'w-full max-w-2xl mx-auto',
		},
		// top: {
		// 	default: '',
		// 	none: '',
		// 	large: '',
		// 	small: '',
		// },
		// bottom: {
		// 	default: '',
		// 	none: '',
		// 	large: '',
		// 	small: '',
		// },
	},
})

export type Variants = VariantProps<typeof variants>

type TElementProps = React.ComponentProps<'div'> & { asChild?: boolean }

export type TPortableWrapperProps = TElementProps & {
	theme?: TTheme | undefined | null
	shouldSplit: boolean
}

// theme, top, bottom, contain,

export const Wrapper = React.forwardRef<
	React.ElementRef<'div'>,
	Variants & TElementProps
>(function Wrapper({ className, asChild, contain, variant, ...props }, ref) {
	const Comp = asChild ? Slot : 'div'
	return (
		<Comp
			data-portable="wrapper"
			ref={ref}
			className={variants({ contain, variant, className })}
			{...props}
		/>
	)
})

export const Group = React.forwardRef<
	React.ElementRef<'div'>,
	TPortableWrapperProps
>(function PortableWrapper(
	{ className, asChild, shouldSplit, theme, ...props },
	ref,
) {
	const Comp = asChild ? Slot : 'div'

	if (shouldSplit) {
		return (
			<Palette
				data-portable="group"
				asChild
				className={clsx(className, 'bg-background text-foreground')}
				theme={theme}
			>
				<Comp ref={ref} {...props} />
			</Palette>
		)
	}

	return props.children
})
