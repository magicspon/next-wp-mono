import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cx } from '@spon/styled-system/css'
import { hstack } from '@spon/styled-system/patterns'
import type { RecipeVariantProps } from '@spon/styled-system/types'

export type TInlineProps = React.ComponentProps<'div'> &
	RecipeVariantProps<typeof hstack> & {
		asChild?: boolean
	}

export const Inline = React.forwardRef<React.ElementRef<'div'>, TInlineProps>(
	function Inline({ asChild, className, children, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'

		return (
			<Comp
				ref={ref}
				className={cx(hstack({ ...props }), className, 'theme')}
				{...props}
			>
				{children}
			</Comp>
		)
	},
)
