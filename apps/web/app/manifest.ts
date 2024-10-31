import type { MetadataRoute } from 'next'
import { runQuery } from '@spon/cms/lib/runner'
import { settingsQuery } from '@spon/cms/queries/pages/settings.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'

export default async function manifest(): Promise<MetadataRoute.Manifest | null> {
	const data = await runQuery(
		settingsQuery,
		{},
		{ next: { tags: ['settings'] } },
	)
	const page = getFirstOrNull(data.page)

	if (!page) return null

	return {
		name: page.title,
		short_name: page.shortName!,
		description: page.description!,
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}
