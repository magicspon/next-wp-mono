import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { Flex } from '../../layout/Flex'

export type TRadioProps = React.ComponentProps<'input'> &
	VariantProps<typeof style>

/**
 * Component must be wrapped with a label
 * @example
 * <label><Radio /></label>
 * @returns
 */
export const Radio = React.forwardRef<React.ElementRef<'input'>, TRadioProps>(
	function Radio({ theme, dimension, className, ...props }, ref) {
		const cx = style({ theme, dimension, className })

		return (
			<>
				<input
					className="-transate-x-full peer absolute appearance-none opacity-0"
					type="radio"
					{...props}
					ref={ref}
				/>
				<Flex align="center" justify="center" className={cx}>
					<div className="h-full w-full rounded-full bg-current opacity-0 transition-opacity" />
				</Flex>
			</>
		)
	},
)

const style = cva(
	'peer-checked:child:opacity-100 peer-focus:ring peer-focus:ring-ring rounded-full border',
	{
		variants: {
			theme: {
				basic:
					'peer-checked:text-primary peer-checked:shadow text-primary peer-focus:ring-primary',
			},
			dimension: {
				standard: 'w-5 h-5 p-1',
			},
		},
		defaultVariants: {
			theme: 'basic',
			dimension: 'standard',
		},
	},
)
