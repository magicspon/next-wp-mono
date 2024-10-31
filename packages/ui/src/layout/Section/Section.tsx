import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const variants = cva('', {
	variants: {
		variant: {
			default: '',
			secondary: '',
		},
	},
	compoundVariants: [],
	defaultVariants: {
		variant: 'default',
	},
})

type TSectionVariants = VariantProps<typeof variants>

type TElementProps = React.ComponentProps<'div'>

type TSectionProps = TElementProps &
	TSectionVariants & {
		asChild?: boolean
	}

type TElementRef = React.ElementRef<'div'>

/***
 * Section provides a consistent vertical spacing between the larger parts of your page content, creating a sense of hierarchy and separation
 */
export const Section = React.forwardRef<TElementRef, TSectionProps>(
	function Section({ className, variant, asChild, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'

		return (
			<Comp
				className={variants({ className, variant })}
				data-testid="Section"
				ref={ref}
				{...props}
			/>
		)
	},
)
