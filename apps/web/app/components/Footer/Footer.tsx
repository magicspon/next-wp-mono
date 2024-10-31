import Link from 'next/link'
import * as React from 'react'
import type { TFooterMenu } from '@spon/cms/queries/selection/settings.selection'
import { createHref } from '~/utils/createHref'

type TElementProps = React.ComponentProps<'div'>

export type TFooterProps = TElementProps & {
	menu: TFooterMenu
}

export function Footer({ menu }: TFooterProps) {
	return (
		<footer>
			{menu && (
				<>
					{menu.item?.map((node) => (
						<Link key={node._key} {...createHref(node.link)}>
							{node.link.text}
						</Link>
					))}
				</>
			)}
		</footer>
	)
}
