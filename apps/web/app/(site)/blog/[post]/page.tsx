import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { sdk } from '~/lib/gqlClient'
import { Post } from '~/templates/Post'
import { createPage } from '~/utils/createPage'

const { Page, generateMetadata } = createPage({
	params: z.object({
		post: z.string(),
	}),
	loader: async ({ params }) => {
		const data = await sdk.PostQuery({ id: params.post })

		if (!data.post) {
			notFound()
		}

		return {
			page: data.post,
		}
	},
	metadata: async ({ data }) => {
		const { seo } = data.page

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
				images: [seo.twitterImage.sourceUrl],
			},
		}
	},
	component: async ({ data }) => {
		const props = data.page
		return <Post {...props} />
	},
})

export default Page
export { generateMetadata }
