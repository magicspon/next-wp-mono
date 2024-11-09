import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { createClient } from '~/lib/gqlClient'
import type { PageFragment, PageIdType } from '~/schema/generated.graphql'
import { LandingPage } from '~/templates/LandingPage'
import { createPage } from '~/utils/createPage'
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
		const data = await createClient(isPreview).PageQuery({
			id: isPreview ? slug.split(`${PREVIEW_SLUG}/`)[1]! : slug,
			idType: (isPreview ? 'DATABASE_ID' : 'URI') as PageIdType,
			asPreview: isPreview,
		})

		if (!data.page) {
			notFound()
		}

		const { seo, ...page } = data.page

		return {
			page: page,
			seo,
			isPreview,
		}
	},
	metadata: async ({ data }) => {
		const { seo } = data

		return {
			title: seo.title,
			description: seo.metaDesc ?? seo.opengraphDescription,
			keywords: seo.metaKeywords,
			openGraph: {
				title: seo.opengraphTitle,
				description: seo.opengraphDescription,
				type: seo.opengraphType,
				images: [seo.opengraphImage.sourceUrl],
				url: seo.opengraphUrl,
			},
			twitter: {
				title: seo.twitterTitle,
				description: seo.twitterDescription,
				images: [seo.twitterImage?.sourceUrl].filter(Boolean),
			},
		}
	},
	component: async ({ data }) => {
		const base = parse<PageFragment['base']>(data.page?.base)

		return <LandingPage base={base} />
	},
})

export default Page
export { generateMetadata }
