import Link from 'next/link'
import * as React from 'react'
import type { TMainMenu } from '@spon/cms/queries/selection/settings.selection'
import { Item, Overflow } from '@spon/ui/primitives/Overflow'
import { createHref } from '~/utils/createHref'

type TElementProps = React.ComponentProps<'div'>

export type THeaderProps = TElementProps & {
	menu: TMainMenu
}

export function Header({ menu }: THeaderProps) {
	return (
		<header className="py-6">
			{menu && (
				<Overflow asChild>
					<nav className="flex gap-6 whitespace-nowrap">
						{menu.item?.map((node) => (
							<Item key={node._key} asChild>
								<Link
									className="data-closed:invisible"
									{...createHref(node.link)}
								>
									{node.link.text}
								</Link>
							</Item>
						))}
					</nav>
				</Overflow>
			)}
		</header>
	)
}
