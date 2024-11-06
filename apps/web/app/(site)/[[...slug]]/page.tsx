import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { createSdk } from '~/lib/gqlClient'
import type { PageIdType } from '~/schema/generated.graphql'
import { LandingPage } from '~/templates/LandingPage'
import { createPage } from '~/utils/createPage'

export const nextSlugToWpSlug = (nextSlug?: string | string[]) =>
	nextSlug && Array.isArray(nextSlug) ? nextSlug.join('/') : (nextSlug ?? '/')

const { Page, generateMetadata } = createPage({
	params: z.object({
		slug: z.array(z.string()).optional(),
	}),
	loader: async ({ params }) => {
		const slug = nextSlugToWpSlug(params.slug)
		const isPreview = slug.includes('preview')
		const idType = (isPreview ? 'DATABASE_ID' : 'URI') as PageIdType
		const id = isPreview ? slug.split('preview/')[1]! : slug
		const sdk = createSdk(isPreview)
		const data = await sdk.PageQuery({
			id,
			idType,
			asPreview: isPreview,
		})

		console.log({ data, id, idType, asPreview: isPreview })

		if (!data.page) {
			notFound()
		}

		return {
			page: data.page,
			isPreview,
		}
	},
	// metadata: async ({ data }) => {
	// 	const { seo } = data.page

	// 	return {
	// 		title: seo.title,
	// 		description: seo.metaDesc ?? seo.opengraphDescription,
	// 		keywords: seo.metaKeywords,
	// 		openGraph: {
	// 			title: seo.opengraphTitle,
	// 			description: seo.opengraphDescription,
	// 			type: seo.opengraphType,
	// 			images: [seo.opengraphImage.sourceUrl],
	// 			url: seo.opengraphUrl,
	// 		},
	// 		twitter: {
	// 			title: seo.twitterTitle,
	// 			description: seo.twitterDescription,
	// 			images: [seo.twitterImage.sourceUrl],
	// 		},
	// 	}
	// },
	component: async ({ data }) => {
		const props = data.page
		return <LandingPage {...props} />
	},
})

export default Page
export { generateMetadata }
