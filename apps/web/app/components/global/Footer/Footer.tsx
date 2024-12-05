import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Inline } from '@spon/ui/layout/Inline'
import { Stack } from '@spon/ui/layout/Stack'
import { Text } from '@spon/ui/type/Text'
import type { MenuItemFragment } from '~/schema/generated.graphql'

type TElementProps = React.ComponentProps<'header'>

export type TFooterProps = TElementProps & {
	menu: MenuItemFragment[]
}

export function Footer({ menu }: TFooterProps) {
	return (
		<Stack gap={4} asChild alignItems="start">
			<footer className={css({ width: '100%', py: 4, px: 6 })}>
				<Text
					size={5}
					family="heading"
					className={css({ textTransform: 'uppercase' })}
				>
					<Link href="/">Logo</Link>
				</Text>
				<Inline asChild>
					<nav
						className={css({
							gap: {
								md: 6,
							},
						})}
					>
						{menu.map((node) => (
							<Link key={node.id} href={node.uri}>
								<Text size={5} family="heading" asChild>
									<span>{node.label}</span>
								</Text>
							</Link>
						))}
					</nav>
				</Inline>
			</footer>
		</Stack>
	)
}
