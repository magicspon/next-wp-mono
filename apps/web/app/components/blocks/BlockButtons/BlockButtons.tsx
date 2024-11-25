import Link from 'next/link'
import type { ComponentsTextPanelBlocksButtonsLayoutFragment } from '~/schema/generated.graphql'

type TButtons = ComponentsTextPanelBlocksButtonsLayoutFragment

export function BlockButtons({ buttons }: TButtons) {
	return (
		<div data-testid="BlockButtons">
			{buttons.map(({ button }, k) => (
				<div key={k}>
					<Link href={button.link.url}>{button.link.title}</Link>
				</div>
			))}
		</div>
	)
}
