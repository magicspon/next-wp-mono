import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Inline } from '@spon/ui/layout/Inline'
import { Text } from '@spon/ui/type/Text'
import { MainMenu } from '~/components/global/MainMenu'
import { MobileMenu } from '~/components/global/MobileMenu'
import type { MenuItemFragment } from '~/schema/generated.graphql'

type TElementProps = React.ComponentProps<'header'>

export type THeaderProps = TElementProps & {
	menu: MenuItemFragment[]
	mobileMenu: MenuItemFragment[]
}

export function Header({ menu, mobileMenu }: THeaderProps) {
	return (
		<Inline asChild>
			<header className={css({ width: '100%', py: 4, px: 6, gap: 12 })}>
				<Text
					size={5}
					family="heading"
					className={css({ textTransform: 'uppercase' })}
				>
					<Link href="/">Logo</Link>
				</Text>
				{menu && <MainMenu menu={menu} />}
				{mobileMenu && <MobileMenu menu={menu} />}
			</header>
		</Inline>
	)
}
