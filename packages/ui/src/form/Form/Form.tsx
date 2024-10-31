import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type TFormProps = React.ComponentProps<'form'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Form /></label>
 * @returns
 */
export const Form = React.forwardRef<React.ElementRef<'form'>, TFormProps>(
	function Form({ theme, className, status, ...props }, ref) {
		const cx = style({ theme, className, status })

		return <form data-state={status} ref={ref} className={cx} {...props} />
	},
)

const style = cva(
	'data-loading:opacity-80 data-loading:pointer-events-none group',
	{
		variants: {
			theme: {
				basic: '',
			},
			status: {
				loading: 'opacity-75',
				pending: '',
				finished: '',
				disabled: 'opacity-50',
				false: null,
			},
		},
		defaultVariants: {
			theme: 'basic',
		},
	},
)
