import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const style = cva('grid', {
	variants: {
		columns: {
			blog: 'gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]',
		},
	},
	defaultVariants: {},
})

export type TGridProps = React.ComponentProps<'div'> & {
	asChild?: boolean
} & VariantProps<typeof style>

export const Grid = React.forwardRef<React.ElementRef<'div'>, TGridProps>(
	function Grid({ asChild, className, columns, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'
		const cx = style({ className, columns })

		return <Comp ref={ref} className={cx} {...props} />
	},
)
