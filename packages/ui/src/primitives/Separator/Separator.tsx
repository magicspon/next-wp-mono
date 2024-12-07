'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'
import * as React from 'react'

export const Separator = React.forwardRef<
	React.ComponentRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(function Separator(
	{ className, orientation = 'horizontal', decorative = true, ...props },
	ref,
) {
	return (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={clsx(
				'bg-border shrink-0',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className,
			)}
			{...props}
		/>
	)
})
