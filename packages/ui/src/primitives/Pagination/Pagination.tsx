'use client'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import * as React from 'react'
import { Flex } from '../../layout/Flex'

type CoreProps = React.PropsWithChildren<{
	asChild?: boolean
	className?: string
}>

const PaginationContext = React.createContext<{ page: number; total: number }>(
	null!,
)

const usePaginationContext = () => React.useContext(PaginationContext)

export function Root({
	children,
	align = 'stretch',
	justify = 'center',
	page,
	total,
	...props
}: React.ComponentProps<typeof Flex> & { page: number; total: number }) {
	return (
		<PaginationContext.Provider value={{ page, total }}>
			<Flex asChild align={align} justify={justify} {...props}>
				<nav>{children}</nav>
			</Flex>
		</PaginationContext.Provider>
	)
}

export const First = React.forwardRef<React.ElementRef<'a'>, CoreProps>(
	function First({ asChild, className, ...props }, ref) {
		const Component = asChild ? Slot : 'a'
		const { page } = usePaginationContext()
		const disabled = page === 1
		return (
			<Component
				className={clsx(className, 'inline-flex h-10 md:h-10')}
				ref={ref}
				{...props}
				aria-disabled={disabled}
				onClick={(e) => {
					if (disabled) e.preventDefault()
				}}
			/>
		)
	},
)

export const Last = React.forwardRef<React.ElementRef<'a'>, CoreProps>(
	function Last({ asChild, className, ...props }, ref) {
		const Component = asChild ? Slot : 'a'
		const { page, total } = usePaginationContext()
		const disabled = page === total

		return (
			<Component
				className={clsx(className, 'inline-flex h-10 md:h-10')}
				ref={ref}
				{...props}
				aria-disabled={disabled}
				onClick={(e) => {
					if (disabled) e.preventDefault()
				}}
			/>
		)
	},
)

export const Previous = React.forwardRef<React.ElementRef<'a'>, CoreProps>(
	function Previous({ asChild, className, ...props }, ref) {
		const Component = asChild ? Slot : 'a'
		const { page } = usePaginationContext()
		const disabled = page === 1

		return (
			<Component
				className={clsx(className, 'inline-flex h-10 md:h-10')}
				ref={ref}
				{...props}
				aria-disabled={disabled}
				onClick={(e) => {
					if (disabled) e.preventDefault()
				}}
			/>
		)
	},
)

export const Next = React.forwardRef<React.ElementRef<'a'>, CoreProps>(
	function Next({ asChild, className, ...props }, ref) {
		const Component = asChild ? Slot : 'a'
		const { page, total } = usePaginationContext()
		const disabled = page === total

		return (
			<Component
				className={clsx(className, 'inline-flex h-10 md:h-10')}
				ref={ref}
				{...props}
				aria-disabled={disabled}
				onClick={(e) => {
					if (disabled) e.preventDefault()
				}}
			/>
		)
	},
)

export const Group = React.forwardRef<React.ElementRef<'div'>, CoreProps>(
	function Group({ asChild, className, ...props }, ref) {
		const Component = asChild ? Slot : 'div'
		return (
			<Component className={clsx(className, 'flex')} ref={ref} {...props} />
		)
	},
)

export const Item = React.forwardRef<
	React.ElementRef<'a'>,
	CoreProps & { value: number }
>(function Item(
	{
		asChild,
		className = 'border-t-2 border-transparent data-active:border-background',
		value,
		...props
	},
	ref,
) {
	const Component = asChild ? Slot : 'a'
	const { page } = usePaginationContext()
	return (
		<Component
			className={clsx(
				className,
				'inline-flex size-6 items-center justify-center border-t text-center md:size-10',
			)}
			ref={ref}
			data-state={value === page ? 'active' : ''}
			{...props}
		/>
	)
})

export const Arrow = React.forwardRef<
	SVGSVGElement,
	React.ComponentProps<typeof ArrowLeftIcon> & { forward?: boolean }
>(function Arrow({ className = 'w-5', forward, ...props }, ref) {
	return (
		<ArrowLeftIcon
			className={clsx(className, forward && 'rotate-180')}
			{...props}
			ref={ref}
		/>
	)
})
