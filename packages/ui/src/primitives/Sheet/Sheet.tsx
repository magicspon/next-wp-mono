'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

export const Root = SheetPrimitive.Root

export const Trigger = SheetPrimitive.Trigger

export const Close = SheetPrimitive.Close

export const Portal = SheetPrimitive.Portal

export const Overlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function Overlay({ className, ...props }, ref) {
	return (
		<SheetPrimitive.Overlay
			className={clsx(
				'bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm',
				className,
			)}
			{...props}
			ref={ref}
		/>
	)
})

const sheetVariants = cva(
	'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
	{
		variants: {
			side: {
				top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
				bottom:
					'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
				left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
				right:
					'inset-y-0 right-0 h-full w-full sm:w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	},
)

interface ContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {}

export const Content = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	ContentProps
>(function Content({ side = 'right', className, children, ...props }, ref) {
	return (
		<Portal>
			<Overlay />
			<SheetPrimitive.Content
				ref={ref}
				className={clsx(sheetVariants({ side }), className, 'overflow-auto')}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
					<Cross2Icon className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</Portal>
	)
})

export function Header({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={clsx(
				'flex flex-col space-y-2 text-center sm:text-left',
				className,
			)}
			{...props}
		/>
	)
}

export function Footer({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={clsx(
				'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
				className,
			)}
			{...props}
		/>
	)
}

export const Title = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(function Title({ className, ...props }, ref) {
	return (
		<SheetPrimitive.Title
			ref={ref}
			className={clsx('text-foreground text-lg font-semibold', className)}
			{...props}
		/>
	)
})

export const Description = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(function Description({ className, ...props }, ref) {
	return (
		<SheetPrimitive.Description
			ref={ref}
			className={clsx('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
})
