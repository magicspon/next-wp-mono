import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { createClient } from '~/lib/gqlClient'
import type {
	ContentNodeIdTypeEnum,
	PageFragment,
	PageIdType,
	TeaserPageFragment,
} from '~/schema/generated.graphql'
import { LandingPage } from '~/templates/LandingPage'
import { ListPage } from '~/templates/ListPage'
import { createPage } from '~/utils/createPage'
import { parseContent } from '~/utils/parseContent'
import { parse } from '~/utils/portable/htmlToPortableText'

export const createUri = (nextSlug?: string | string[]) =>
	`/${nextSlug && Array.isArray(nextSlug) ? nextSlug.join('/') : (nextSlug ?? '')}`

const PREVIEW_SLUG = 'preview'

const { Page, generateMetadata } = createPage({
	params: z.object({
		slug: z.array(z.string()).optional(),
	}),
	loader: async ({ params }) => {
		const slug = createUri(params.slug)
		const isPreview = slug.includes(PREVIEW_SLUG)
		const client = createClient(isPreview)

		const { contentNode } = await client.ContentInfo({
			slug: isPreview ? slug.split(`${PREVIEW_SLUG}/`)[1]! : slug,
			idType: (isPreview ? 'DATABASE_ID' : 'URI') as ContentNodeIdTypeEnum,
		})

		const queryVars = {
			id: isPreview ? slug.split(`${PREVIEW_SLUG}/`)[1]! : slug,
			idType: (isPreview ? 'DATABASE_ID' : 'URI') as PageIdType,
			asPreview: isPreview,
		} as const

		switch (contentNode.template.templateName) {
			case 'Listing': {
				const data = await client.ListingQuery({
					...queryVars,
					parent: String(contentNode.databaseId),
				})
				if (!data.page) {
					notFound()
				}

				const { seo, ...page } = data.page
				return {
					__template: 'listing' as const,
					page: page,
					pages: data.pages,
					seo,
					isPreview,
				}
			}

			default: {
				const data = await client.PageQuery(queryVars)

				if (!data.page) {
					notFound()
				}

				const { seo, ...page } = data.page
				return {
					__template: 'default' as const,
					page: page,
					seo,
					isPreview,
				}
			}
		}
	},
	// metadata: async ({ data }) => {
	// 	const { seo } = data

	// 	return {
	// 		title: seo.title,
	// 		description: seo.metaDesc ?? seo.opengraphDescription,
	// 		keywords: seo.metaKeywords,
	// 		openGraph: {
	// 			title: seo.opengraphTitle,
	// 			description: seo.opengraphDescription,
	// 			type: seo.opengraphType,
	// 			images: [seo.opengraphImage?.sourceUrl].filter(Boolean),
	// 			url: seo.opengraphUrl,
	// 		},
	// 		twitter: {
	// 			title: seo.twitterTitle,
	// 			description: seo.twitterDescription,
	// 			images: [seo.twitterImage?.sourceUrl].filter(Boolean),
	// 		},
	// 	}
	// },
	component: async ({ data }) => {
		const { hero, structure } = parse<PageFragment['base']>(data.page?.base)
		switch (data.__template) {
			case 'listing': {
				const pages = data.pages.edges.map((n) =>
					parse<TeaserPageFragment>(n.node),
				)

				return (
					<ListPage
						hero={hero}
						structure={parseContent(structure)}
						pages={pages}
					/>
				)
			}

			default: {
				return <LandingPage hero={hero} structure={parseContent(structure)} />
			}
		}
	},
})

export default Page
export { generateMetadata }
