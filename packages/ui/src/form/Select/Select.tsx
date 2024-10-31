import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type TSelectProps = React.ComponentProps<'select'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Select /></label>
 * @returns
 */
export const Select = React.forwardRef<
	React.ElementRef<'select'>,
	TSelectProps
>(function Select({ theme, dimension, className, ...props }, ref) {
	const cx = style({ theme, dimension, className })

	return <select className={cx} {...props} ref={ref} />
})

const style = cva(
	'block border appearance-none bg-chevron bg-[size:1.25rem_1.25rem] bg-[position:calc(100%-0.5rem)_50%] bg-no-repeat rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
	{
		variants: {
			theme: {
				basic: '',
			},
			dimension: {
				standard: '',
			},
		},
		defaultVariants: {
			theme: 'basic',
			dimension: 'standard',
		},
	},
)
