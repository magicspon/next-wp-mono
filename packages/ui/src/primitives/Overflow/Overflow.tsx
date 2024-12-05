'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { useIsClient, useWindowSize } from 'usehooks-ts'
import { cx } from '@spon/styled-system/css'
import { flex } from '@spon/styled-system/patterns'

type TOverflowContext = {
	value: number
}

const OverflowContext = React.createContext<TOverflowContext>(null!)

function useOverflow() {
	return React.useContext(OverflowContext)
}

type TOverflowProps = React.ComponentProps<'nav'> & {
	asChild?: boolean
}

export function Overflow({ asChild, className, ...props }: TOverflowProps) {
	const Comp = asChild ? Slot : 'nav'
	const isClient = useIsClient()
	const { width } = useWindowSize({ debounceDelay: 100 })
	const ref = React.useRef<React.ElementRef<'nav'>>(null!)
	const [value, setValue] = React.useState<number>(null!)

	const runCheck = React.useCallback(() => {
		const item = ref.current
		if (!item) return
		const box = item.getBoundingClientRect()
		setValue(box.right)
	}, [])

	React.useEffect(() => {
		if (isClient && width) {
			runCheck()
		}
	}, [isClient, width, runCheck])

	return (
		<OverflowContext.Provider value={{ value: value }}>
			<Comp
				data-testid="Overflow"
				ref={ref}
				{...props}
				className={cx(
					flex({
						whiteSpace: 'nowrap',
						gap: 4,
						overflow: 'hidden',
						pos: 'relative',
					}),
					className,
				)}
			/>
		</OverflowContext.Provider>
	)
}

type TItemProps = React.ComponentProps<'div'> & {
	asChild?: boolean
}

export function Item({ asChild, ...props }: TItemProps) {
	const Comp = asChild ? Slot : 'div'
	const ref = React.useRef<React.ElementRef<'div'>>(null!)
	const { value } = useOverflow()
	const isClient = useIsClient
	const [attr, setAttr] = React.useState('open')

	React.useEffect(() => {
		const item = ref.current
		if (!isClient || !item) return

		const box = item.getBoundingClientRect()
		const clipped = box.right > value
		setAttr(clipped ? 'closed' : 'open')
	}, [value, isClient])

	return <Comp ref={ref} data-state={attr} {...props} />
}
