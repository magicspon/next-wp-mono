import type { Variant } from 'framer-motion'
import { m } from 'framer-motion'
import * as React from 'react'
import { VisuallyHidden } from '../../type/VisuallyHidden'

export const entrance = {
	enter: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
}

interface TFilling {
	isOpen: boolean
	closed: Variant
	open: Variant
}

function Filling({ isOpen, closed, open }: TFilling) {
	return (
		<m.span
			key="a"
			initial="closed"
			variants={{
				closed,
				open,
			}}
			animate={isOpen ? 'open' : 'closed'}
			style={{ height: 2 }}
			className="absolute inset-0 mx-auto my-auto w-6 bg-current"
		/>
	)
}

type TNavButton = React.ComponentProps<'button'> & {
	isOpen: boolean
	// setOpen: (v: boolean) => void
}

export const NavButton = React.forwardRef<
	React.ElementRef<'button'>,
	TNavButton
>(function NavButton({ isOpen, ...props }, ref) {
	return (
		<button
			ref={ref}
			type="button"
			className="text-navy bg-mustard relative z-50 flex h-16 w-16 flex-col items-center justify-center self-start p-5 focus:outline-none"
			{...props}
		>
			<Filling
				key="a"
				isOpen={isOpen}
				closed={{ opacity: 1, y: -9, scale: 1 }}
				open={{ opacity: 0, y: 0, scale: 0 }}
			/>
			<Filling
				key="b"
				isOpen={isOpen}
				closed={{ opacity: 1, x: 0, y: -3, rotate: 0 }}
				open={{ y: 0, rotate: -45 }}
			/>
			<Filling
				key="c"
				isOpen={isOpen}
				closed={{ opacity: 1, x: 0, y: 3, rotate: 0 }}
				open={{ y: 0, rotate: 45 }}
			/>
			<Filling
				key="d"
				isOpen={isOpen}
				closed={{ opacity: 1, y: 9, scale: 1 }}
				open={{ opacity: 0, y: 0, scale: 0 }}
			/>
			<VisuallyHidden className="sr-only">Menu</VisuallyHidden>
		</button>
	)
})
