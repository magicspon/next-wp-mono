import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cx } from '@spon/styled-system/css'

type TElementProps = React.ComponentProps<'div'>

type TThemeProps = TElementProps & {
	asChild?: boolean
}

export const Theme = React.forwardRef<React.ElementRef<'div'>, TThemeProps>(
	function Theme({ className, asChild, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'

		return (
			<Comp
				className={cx('theme', className)}
				data-testid="Theme"
				ref={ref}
				{...props}
			/>
		)
	},
)
