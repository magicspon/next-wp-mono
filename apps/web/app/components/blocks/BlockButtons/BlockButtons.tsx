import Link from 'next/link'
import { css, cx } from '@spon/styled-system/css'
import type { ComponentsTextPanelBlocksButtonsLayoutFragment } from '~/schema/generated.graphql'

type TButtons = ComponentsTextPanelBlocksButtonsLayoutFragment & {
	className?: string
}

export function BlockButtons({ buttons, className }: TButtons) {
	return (
		<div className={cx(className, css({}))} data-testid="BlockButtons">
			{buttons.map(({ button }, k) => (
				<div key={k}>
					<Link href={button.link.url}>{button.link.title}</Link>
				</div>
			))}
		</div>
	)
}
