'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
	CheckIcon,
	ChevronRightIcon,
	DotFilledIcon,
} from '@radix-ui/react-icons'
import clsx from 'clsx'
import * as React from 'react'

export const Root = DropdownMenuPrimitive.Root

export const Trigger = DropdownMenuPrimitive.Trigger

export const Group = DropdownMenuPrimitive.Group

export const Portal = DropdownMenuPrimitive.Portal

export const Sub = DropdownMenuPrimitive.Sub

export const RadioGroup = DropdownMenuPrimitive.RadioGroup

export const SubTrigger = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean
	}
>(function SubTrigger({ className, inset, children, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			ref={ref}
			className={clsx(
				'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
				inset && 'pl-8',
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto size-4" />
		</DropdownMenuPrimitive.SubTrigger>
	)
})

export const SubContent = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(function SubContent({ className, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.SubContent
			ref={ref}
			className={clsx(
				'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
				className,
			)}
			{...props}
		/>
	)
})

export const Content = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function Content({ className, sideOffset = 4, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={clsx(
					'bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
})

export const Item = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean
	}
>(function Item({ className, inset, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.Item
			ref={ref}
			className={clsx(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				inset && 'pl-8',
				className,
			)}
			{...props}
		/>
	)
})

export const CheckboxItem = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function CheckboxItem({ className, children, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			ref={ref}
			className={clsx(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	)
})

export const RadioItem = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function RadioItem({ className, children, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.RadioItem
			ref={ref}
			className={clsx(
				'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<DotFilledIcon className="size-4 fill-current" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	)
})

export const Label = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean
	}
>(function Label({ className, inset, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.Label
			ref={ref}
			className={clsx(
				'px-2 py-1.5 text-sm font-semibold',
				inset && 'pl-8',
				className,
			)}
			{...props}
		/>
	)
})

export const Separator = React.forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function Separator({ className, ...props }, ref) {
	return (
		<DropdownMenuPrimitive.Separator
			ref={ref}
			className={clsx('bg-muted -mx-1 my-1 h-px', className)}
			{...props}
		/>
	)
})

export function Shortcut({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			className={clsx('ml-auto text-xs tracking-widest opacity-60', className)}
			{...props}
		/>
	)
}
