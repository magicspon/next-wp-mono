import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type HeadingStyleProps = VariantProps<typeof headingVariants>

export type THeadingProps = React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4'> &
	HeadingStyleProps & {
		asChild?: boolean
		level?: 1 | 2 | 3 | 4
	}

export const Heading = React.forwardRef<
	React.ElementRef<'h1' | 'h2' | 'h3' | 'h4'>,
	THeadingProps
>(function Heading(
	{
		asChild,
		className,
		weight,
		intent,
		center,
		noTrim = false,
		level = 2,
		...props
	},
	ref,
) {
	const Comp = asChild ? Slot : `h${level}`
	const cx = headingVariants({
		weight,
		className,
		noTrim,
		center,
		intent,
	})

	return <Comp ref={ref} className={cx} {...props} />
})

export const headingVariants = cva('scroll-m-20', {
	variants: {
		weight: {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		},

		intent: {
			h1: 'text-5xl lg:text-6xl',
			h2: 'text-3xl lg:text-4xl',
			h3: 'text-2xl lg:text-3xl',
			h4: 'text-xl lg:text-2xl',
			h5: 'text-lg lg:text-xl',
			card: 'lg:text-lg',
			news: 'text-base lg:text-xl',
		},

		center: {
			true: 'text-center',
		},

		noTrim: {
			false: 'trim',
		},
	},
	defaultVariants: {
		weight: 'normal',
		intent: 'h2',
		noTrim: false,
	},
})
