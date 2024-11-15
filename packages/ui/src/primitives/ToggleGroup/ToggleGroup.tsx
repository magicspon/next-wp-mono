'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'
import { toggleVariants } from '../Toggle/Toggle'

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants>
>({
	size: 'sm',
})

export const Root = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(function Root(
	{
		className = 'flex flex-wrap items-center gap-1',
		size,

		children,
		...props
	},
	ref,
) {
	return (
		<ToggleGroupPrimitive.Root ref={ref} className={className} {...props}>
			<ToggleGroupContext.Provider value={{ size }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	)
})

export const Item = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof toggleVariants>
>(function Item({ className, children, size, ...props }, ref) {
	const context = React.useContext(ToggleGroupContext)

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={clsx(
				toggleVariants({
					size: context.size ?? size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	)
})
