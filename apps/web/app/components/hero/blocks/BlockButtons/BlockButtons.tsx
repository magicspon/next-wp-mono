import Link from 'next/link'
import type { BlockButtonsFragment } from '~/schema/generated.graphql'

export function BlockButtons({ buttons }: BlockButtonsFragment) {
	return (
		<div>
			{buttons.map(({ button }, k) => (
				<div key={k}>
					<Link href={button.link.url}>{button.link.title}</Link>
				</div>
			))}
		</div>
	)
}
