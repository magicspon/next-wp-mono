import Link from 'next/link'
import type { BlockButtonsFragment } from '~/schema/generated.graphql'

export function BlockButtons({
	buttons,
}: Omit<BlockButtonsFragment, '__typename'>) {
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
