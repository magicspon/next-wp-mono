import { notFound } from 'next/navigation'
import * as React from 'react'
import { homeQuery } from '@spon/cms/queries/pages/home.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { HomePage } from '~/templates/HomePage'
import { createPage } from '~/utils/createPage'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

const { Page, generateMetadata } = createPage({
	loader: async () => {
		const runner = createSanityFetcher()

		const data = await runner(homeQuery, {}, { next: { tags: ['index'] } })
		const page = getFirstOrNull(data.page)

		if (!page) {
			notFound()
		}

		return {
			page: page,
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
