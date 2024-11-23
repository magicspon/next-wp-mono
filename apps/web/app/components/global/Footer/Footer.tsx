import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Text } from '@spon/ui/type/Text'
import type { MenuItemFragment } from '~/schema/generated.graphql'

type TElementProps = React.ComponentProps<'header'>

export type TFooterProps = TElementProps & {
	menu: MenuItemFragment[]
}

export function Footer({ menu }: TFooterProps) {
	return (
		<footer className={css({ width: '100%', py: 4, px: 6, gap: 12 })}>
			<Text
				size={5}
				family="heading"
				className={css({ textTransform: 'uppercase' })}
			>
				<Link href="/">Logo</Link>
			</Text>
			<nav
				className={css({
					gap: {
						md: 6,
					},
				})}
			>
				{menu.map((node) => (
					<Link
						key={node.id}
						className={css({
							p: 2,
							'&[data-state=closed]': { opacity: '0' },
						})}
						href={node.uri}
					>
						<Text size={5} family="heading" asChild>
							<span>{node.label}</span>
						</Text>
					</Link>
				))}
			</nav>
		</footer>
	)
}
