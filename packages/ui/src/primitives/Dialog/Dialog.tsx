import * as RadixDialog from '@radix-ui/react-dialog'
import * as React from 'react'

export const Root = RadixDialog.Root

export const Trigger = RadixDialog.Trigger

export function Portal({ ...props }: RadixDialog.DialogPortalProps) {
	return <RadixDialog.Portal {...props} />
}

export const Overlay = React.forwardRef<
	React.ComponentRef<typeof RadixDialog.Overlay>,
	React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(function Overlay({ className, ...props }, ref) {
	return <RadixDialog.Overlay ref={ref} className={className} {...props} />
})

export const Content = React.forwardRef<
	React.ComponentRef<typeof RadixDialog.Content>,
	React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(function Content({ children, ...props }, ref) {
	return (
		<Portal>
			<Overlay className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/90" />
			<RadixDialog.Content
				ref={ref}
				className="w-window h-window data-open:duration-1000 data-closed:duration-300 pt-98 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-125 data-open:zoom-in-50 fixed inset-0 z-50 mx-auto overflow-hidden pb-28"
				{...props}
			>
				{children}
			</RadixDialog.Content>
		</Portal>
	)
})

export const Title = React.forwardRef<
	React.ComponentRef<typeof RadixDialog.Title>,
	React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function Title({ className, ...props }, ref) {
	return <RadixDialog.Title ref={ref} className={className} {...props} />
})

export const Description = React.forwardRef<
	React.ComponentRef<typeof RadixDialog.Description>,
	React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function Description({ className, ...props }, ref) {
	return <RadixDialog.Description ref={ref} className={className} {...props} />
})
