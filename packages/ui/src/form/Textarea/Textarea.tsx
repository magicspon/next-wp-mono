import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type TTextareaProps = React.ComponentProps<'textarea'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Textarea /></label>
 * @returns
 */
export const Textarea = React.forwardRef<
	React.ElementRef<'textarea'>,
	TTextareaProps
>(function Textarea(
	{ theme, dimension, invalid, className, floating, error, ...props },
	ref,
) {
	const cx = style({ theme, dimension, invalid, floating, error, className })

	return <textarea ref={ref} className={cx} {...props} />
})

const style = cva('block w-full peer focus:outline-none', {
	variants: {
		theme: {
			basic: 'border px-4 py-3 focus:ring focus:ring-blue-600',
		},
		dimension: {
			standard: '',
		},
		invalid: {
			standard:
				'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
		},
		floating: {
			true: 'placeholder-unfocus:opacity-0 placeholder-gray-400 pt-6 pb-0',
		},
		error: {
			true: 'border-pink-500',
		},
	},
	defaultVariants: {
		theme: 'basic',
		dimension: 'standard',
		invalid: 'standard',
	},
})
