import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { sdk } from '~/lib/gqlClient'
import { LandingPage } from '~/templates/LandingPage'
import { createPage } from '~/utils/createPage'

const { Page, generateMetadata } = createPage({
	params: z.object({
		page: z.string(),
	}),
	loader: async ({ params }) => {
		const data = await sdk.PageQuery({ id: params.page })

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
		return <LandingPage {...props} />
	},
})

export default Page
export { generateMetadata }
