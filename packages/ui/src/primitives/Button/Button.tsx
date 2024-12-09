import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { type RecipeVariantProps, cva, cx } from '@spon/styled-system/css'

const button = cva({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		whiteSpace: 'nowrap',
		rounded: 'md',
		fontSize: 'sm',
		lineHeight: 'sm',
		fontWeight: 'medium',
		transitionProperty:
			'color, background-color, border-color, text-decoration-color, fill, stroke',
		transitionTimingFunction: 'colors',
		transitionDuration: 'colors',
		_focusVisible: { ring: 'none', ringOffset: 'none', shadow: '1' },
		_disabled: { pointerEvents: 'none', opacity: '0.5' },
	},
	variants: {
		variant: {
			default: { shadow: 'shadow' },
			destructive: { shadow: 'sm' },
			outline: { borderWidth: '1px', shadow: 'sm' },
			secondary: { shadow: 'sm' },
			link: {
				textUnderlineOffset: '4px',
				_hover: { textDecorationLine: 'underline' },
			},
		},
		size: {
			sm: { padding: '4', fontSize: '12px' },
			lg: { padding: '8', textStyle: 'body/4' },
		},
	},
})

export const buttonVariants = button

export type ButtonVariant = RecipeVariantProps<typeof button>

export type ButtonProps = React.ComponentProps<'button'> &
	ButtonVariant & { asChild?: boolean }

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>(
	function Button(
		{ className, variant, size, asChild = false, ...props },
		ref,
	) {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cx(button({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		)
	},
)
