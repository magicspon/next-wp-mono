import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { css, cx } from '@spon/styled-system/css'
import type { SystemStyleObject } from '@spon/styled-system/types'

export type TScalingProps = React.ComponentProps<'div'> & {
	asChild?: boolean
	scaling: SystemStyleObject['scaling']
}

export const Scaling = React.forwardRef<React.ElementRef<'div'>, TScalingProps>(
	function Scaling({ asChild, className, scaling, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'

		return (
			<Comp
				ref={ref}
				className={cx(css({ scaling }), className, 'theme')}
				{...props}
			/>
		)
	},
)
