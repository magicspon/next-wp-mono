import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

export const Label = React.forwardRef<
	React.ComponentRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(function Label({ className, ...props }, ref) {
	return (
		<LabelPrimitive.Root
			ref={ref}
			className={labelVariants({ className })}
			{...props}
		/>
	)
})
