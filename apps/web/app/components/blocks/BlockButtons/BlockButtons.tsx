import Link from 'next/link'
import type { TextPanelBlocksButtonsFragment } from '~/schema/generated.graphql'

export function BlockButtons({
	buttons,
}: Omit<TextPanelBlocksButtonsFragment, '__typename'>) {
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
