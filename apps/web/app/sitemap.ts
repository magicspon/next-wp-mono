import type { MetadataRoute } from 'next'
import { runQuery } from '@spon/cms/lib/runner'
import { sitemapQuery } from '@spon/cms/queries/pages/sitemap.query'
import { env } from './env/server'

const SITE_URL = env.SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await runQuery(sitemapQuery)

	const posts = data.posts.map(
		(p) =>
			({
				url: `${SITE_URL}/blog/${p.slug}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 1,
			}) as const,
	)

	const pages = data.pages.map(
		(p) =>
			({
				url: `${SITE_URL}/${p.slug}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 1,
			}) as const,
	)

	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		...posts,
		...pages,
	]
}
