'use client'

import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Item, Overflow } from '@spon/ui/primitives/Overflow'
import { Text } from '@spon/ui/type/Text'
import type { MenuItemFragment } from '~/schema/generated.graphql'

export type TMainMenuProps = {
	menu: MenuItemFragment[]
}

export function MainMenu({ menu }: TMainMenuProps) {
	return (
		<Overflow asChild>
			<nav
				className={css({
					gap: {
						md: 6,
					},
				})}
			>
				{menu.map((node) => (
					<Item asChild key={node.id}>
						<Link
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
					</Item>
				))}
			</nav>
		</Overflow>
	)
}
