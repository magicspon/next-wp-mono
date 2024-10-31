import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export type TLabelProps = Omit<React.ComponentProps<'label'>, 'size'> &
	VariantProps<typeof style> & {
		text: string
		asChild?: boolean
	}

/**
 * Component must be wrapped with a label
 * @example
 * <label><Label /></label>
 * @returns
 */
export const FloatingLabel = React.forwardRef<
	React.ElementRef<'label'>,
	TLabelProps
>(function FloatingLabel(
	{ className, children, text, element, asChild, ...props },
	ref,
) {
	const cx = style({ element, className })
	const Comp = asChild ? Slot : 'label'

	return (
		<Comp ref={ref} className="relative block" {...props}>
			{children}
			<span className={cx}>{text}</span>
		</Comp>
	)
})

const style = cva(
	[
		'pointer-events-none',
		'transition-transform flex items-center origin-top-left transform absolute top-0 z-1 translate-x-4',
		'placeholder-visible:opacity-50 placeholder-visible:scale-100 placeholder-visible:translate-y-0 placeholder-visible',
	],
	{
		variants: {
			element: {
				input: 'h-full -translate-y-2 scale-[0.75] opacity-75',
				textarea:
					'h-12 -translate-y-2 scale-[0.75] opacity-75 peer:placeholder-shown:transate-y-0',
			},
		},
		defaultVariants: {
			element: 'input',
		},
	},
)
