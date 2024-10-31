import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

const alertVariants = cva(
	'relative w-full rounded-lg border [&>svg]:absolute ',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				tip: 'bg-background text-foreground',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			},
			size: {
				default:
					'px-4 py-3 text-sm [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px]  [&>svg]:left-4 [&>svg]:top-4',
				lg: 'px-6 py-5 text-base [&:has(svg)]:pl-12 [&>svg+div]:translate-y-[-3px]  [&>svg]:left-4 [&>svg]:top-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export const Root = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'> & VariantProps<typeof alertVariants>
>(function Alert({ className, variant, size, ...props }, ref) {
	return (
		<div
			ref={ref}
			role="alert"
			className={alertVariants({ variant, size, className })}
			{...props}
		/>
	)
})

const alertTitle = cva('', {
	variants: {
		size: {
			default: 'mb-1',
			lg: 'mb-3',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

export const Title = React.forwardRef<
	React.ElementRef<'p'>,
	React.ComponentProps<'p'> & VariantProps<typeof alertTitle>
>(function Title({ className, size, ...props }, ref) {
	// eslint-disable-next-line jsx-a11y/heading-has-content
	return <h3 ref={ref} className={alertTitle({ className, size })} {...props} />
})

export const Description = React.forwardRef<
	React.ElementRef<'p'>,
	React.ComponentProps<'p'>
>(function Description({ className, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={clsx('text-sm [&_p]:leading-relaxed', className)}
			{...props}
		/>
	)
})
