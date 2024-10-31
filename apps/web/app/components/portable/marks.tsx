// Record<string, PortableTextMarkComponent | undefined>
import clsx from 'clsx'
import type { PortableTextMarkComponent } from 'next-sanity'

export const marks: Record<string, PortableTextMarkComponent> = {
	highlight: ({ children }) => <span className="text-accent">{children}</span>,
	uppercase: ({ children }) => <span className="uppercase">{children}</span>,
	em: ({ children }) => <em>{children}</em>,
	underline: ({ children }) => <span className="underline">{children}</span>,
	weight: ({ children, value }) => {
		return (
			<span
				className={clsx({
					'font-light': value?.weight === 'light',
					'font-regular': value?.weight === 'regular',
					'font-medium': value?.weight === 'medium',
					'font-bold': value?.weight === 'bold',
				})}
			>
				{children}
			</span>
		)
	},
}
