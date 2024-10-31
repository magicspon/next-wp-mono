import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type TInputProps = React.ComponentProps<'input'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Input /></label>
 * @returns
 */
export const Input = React.forwardRef<React.ElementRef<'input'>, TInputProps>(
	function Input(
		{ theme, dimension, invalid, className, floating, error, ...props },
		ref,
	) {
		const cx = style({ theme, dimension, invalid, floating, className, error })

		return <input className={cx} ref={ref} {...props} />
	},
)

const style = cva('block h-12 peer w-full focus:outline-none', {
	variants: {
		theme: {
			basic: 'border border-soft px-4 py-3 focus:ring focus:ring-ring',
			simple:
				'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		},
		dimension: {
			standard: '',
		},
		invalid: {
			noop: '',
			standard:
				'placeholder-not-shown:invalid:border-error placeholder-not-shown:invalid:text-error placeholder-not-shown:focus:invalid:border-error placeholder-not-shown:focus:invalid:ring-error',
		},
		floating: {
			true: 'placeholder-unfocus:opacity-0 placeholder-gray-400 pt-4 pb-0',
		},
		error: {
			true: 'border-error',
		},
	},
	defaultVariants: {
		theme: 'basic',
		dimension: 'standard',
		invalid: 'standard',
		floating: false,
	},
})
