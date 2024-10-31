import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cx } from '@spon/styled-system/css'
import { vstack } from '@spon/styled-system/patterns'
import type { RecipeVariantProps } from '@spon/styled-system/types'

export type TStackProps = React.ComponentProps<'div'> &
	RecipeVariantProps<typeof vstack> & {
		asChild?: boolean
	}

export const Stack = React.forwardRef<React.ElementRef<'div'>, TStackProps>(
	function Stack({ asChild, className, children, style, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'

		return (
			<Comp
				ref={ref}
				style={style}
				className={cx('theme', vstack(props), className)}
			>
				{children}
			</Comp>
		)
	},
)
