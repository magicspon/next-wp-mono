import { notFound } from 'next/navigation'
import * as React from 'react'
import { sdk } from '~/lib/gqlClient'
import { HomePage } from '~/templates/HomePage'
import { createPage } from '~/utils/createPage'

const { Page, generateMetadata } = createPage({
	loader: async () => {
		const data = await sdk.HomePageQuery()

		if (!data.page) {
			notFound()
		}

		return {
			page: data.page,
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

		return <HomePage {...props} />
	},
})

export default Page

export { generateMetadata }
