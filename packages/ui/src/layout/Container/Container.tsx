import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Container as StyledContainer, styled } from '@spon/styled-system/jsx'

const StyledSlot = styled(Slot)

export type TContainerProps = React.ComponentProps<typeof StyledContainer> & {
	asChild?: boolean
}

export const Container = React.forwardRef<
	React.ElementRef<'div'>,
	TContainerProps
>(function Container({ asChild, children, ...props }, ref) {
	const Comp = asChild ? StyledSlot : StyledContainer

	return (
		<Comp ref={ref} {...props}>
			{children}
		</Comp>
	)
})
