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
		return {
			title: data.page.title,
		}
	},
	component: async ({ data }) => {
		const props = data.page

		return <HomePage {...props} />
	},
})

export default Page

export { generateMetadata }
