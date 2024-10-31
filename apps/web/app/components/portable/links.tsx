import type { PortableTextTypeComponent } from 'next-sanity'
import Link from 'next/link'
import type { TLinksSelection } from '@spon/cms/queries/fragments/link.fragment'
import { Button } from '@spon/ui/primitives/Button'
import { LinksWrapper } from '~/components/layouts/LinksWrapper'
import { createHref } from '~/utils/createHref'

export const links: Record<
	TLinksSelection['_type'],
	PortableTextTypeComponent<TLinksSelection>
> = {
	links: ({ value }) => {
		const count = value.links?.length ?? 0

		if (!count) return null

		return (
			<LinksWrapper layout={value.layout}>
				{value.links?.map((link) => {
					return (
						<Button key={link._key} asChild variant={link.variant}>
							<Link {...createHref(link)}>{link.text}</Link>
						</Button>
					)
				})}
			</LinksWrapper>
		)
	},
}
