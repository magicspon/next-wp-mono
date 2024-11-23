'use client'

import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Text } from '@spon/ui/type/Text'
import type { MenuItemFragment } from '~/schema/generated.graphql'

export type TMainMenuProps = {
	menu: MenuItemFragment[]
}

export function MobileMenu({ menu }: TMainMenuProps) {
	return (
		<div>
			{menu.map((node) => (
				<Link
					key={node.id}
					className={css({
						p: 2,
					})}
					href={node.uri}
				>
					<Text size={5} family="heading" asChild>
						<span>{node.label}</span>
					</Text>
				</Link>
			))}
		</div>
	)
}
