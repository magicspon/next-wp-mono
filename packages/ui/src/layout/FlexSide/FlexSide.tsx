import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import * as React from 'react'

export type TFlexSideProps = React.ComponentProps<'div'> & {
	asChild?: boolean
}

export const FlexSide = React.forwardRef<
	React.ElementRef<'div'>,
	TFlexSideProps
>(function Em({ asChild, className, ...props }, ref) {
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp ref={ref} className={clsx(className, 'grow basis-0')} {...props} />
	)
})
