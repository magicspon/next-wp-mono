import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { Item, Overflow } from '@spon/ui/primitives/Overflow'
import type { MenuItemFragment } from '~/schema/graphql'

type TElementProps = React.ComponentProps<'header'>

export type THeaderProps = TElementProps & {
	menu: MenuItemFragment[]
}

export function Header({ menu, className, ...props }: THeaderProps) {
	return (
		<header className={clsx(className, 'py-6')} {...props}>
			{menu && (
				<Overflow asChild>
					<nav className="flex gap-6 whitespace-nowrap">
						{menu.map((node) => (
							<Item key={node.id} asChild>
								<Link className="data-closed:invisible" href={node.uri}>
									{node.label}
								</Link>
							</Item>
						))}
					</nav>
				</Overflow>
			)}
		</header>
	)
}
