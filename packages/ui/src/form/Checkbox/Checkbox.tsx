import { CheckIcon } from '@radix-ui/react-icons'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { Flex } from '../../layout/Flex'

export type TCheckboxProps = React.ComponentProps<'input'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Checkbox /></label>
 * @returns
 */
export const Checkbox = React.forwardRef<
	React.ElementRef<'input'>,
	TCheckboxProps
>(function Checkbox({ theme, dimension, className, ...props }, ref) {
	const cx = style({ theme, dimension, className })

	return (
		<>
			<input
				className="-transate-x-full peer absolute appearance-none opacity-0"
				type="checkbox"
				{...props}
				ref={ref}
			/>
			<Flex align="center" justify="center" className={cx}>
				<CheckIcon className="h-full w-full opacity-0 transition-opacity" />
			</Flex>
		</>
	)
})

const style = cva(
	'peer-checked:child:opacity-100 peer-focus:ring peer-focus:ring-ring rounded border peer-disabled:opacity-25',
	{
		variants: {
			theme: {
				basic: 'peer-checked:text-primary peer-focus:ring-primary',
			},
			dimension: {
				standard: 'w-5 h-5',
			},
		},
		defaultVariants: {
			theme: 'basic',
			dimension: 'standard',
		},
	},
)
