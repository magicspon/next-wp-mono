import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const style = cva('flex flex-col', {
	variants: {},
	defaultVariants: {},
})

export type TColumnProps = React.ComponentProps<'div'> &
	VariantProps<typeof style> & {
		asChild?: boolean
	}

export const Column = React.forwardRef<React.ElementRef<'div'>, TColumnProps>(
	function Column({ asChild, className, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'
		const cx = style({ className })

		return <Comp ref={ref} className={cx} {...props} />
	},
)
