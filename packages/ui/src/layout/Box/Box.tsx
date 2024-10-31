import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Box as StyledBox, styled } from '@spon/styled-system/jsx'

const StyledSlot = styled(Slot)

export type TBoxProps = React.ComponentProps<typeof StyledBox> & {
	asChild?: boolean
}

export const Box = React.forwardRef<React.ElementRef<'div'>, TBoxProps>(
	function Box({ asChild, children, ...props }, ref) {
		const Comp = asChild ? StyledSlot : StyledBox

		return (
			<Comp ref={ref} {...props}>
				{children}
			</Comp>
		)
	},
)
