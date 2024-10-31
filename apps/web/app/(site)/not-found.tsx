import { notFound } from 'next/navigation'
import * as React from 'react'
import { notFoundQuery } from '@spon/cms/queries/pages/notFound.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { createPage } from '~/utils/createPage'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

const { Page, generateMetadata } = createPage({
	loader: async () => {
		const runner = createSanityFetcher()

		const data = await runner(notFoundQuery, {})
		const page = getFirstOrNull(data.page)

		if (!page) {
			console.log({ page })
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

		return <pre>{JSON.stringify(props, null, 2)}</pre>
	},
})

export default Page

export { generateMetadata }
