import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { pageQuery } from '@spon/cms/queries/pages/page.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { LandingPage } from '~/templates/LandingPage'
import { createPage } from '~/utils/createPage'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

const { Page, generateMetadata } = createPage({
	params: z.object({
		page: z.string(),
	}),
	loader: async ({ params }) => {
		const runner = createSanityFetcher()
		// sometimes vscode will complain about the type being to deep
		// the type is still created so i think we can safely ignore it
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore Type instantiation is excessively deep and possibly infinite
		const data = await runner(
			pageQuery,
			{ slug: params.page },
			{ next: { tags: ['page', params.page] } },
		)
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
		console.log('[PAGE]')

		const props = data.page
		return <LandingPage {...props} />
	},
})

export default Page
export { generateMetadata }
