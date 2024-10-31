import { notFound } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'
import { postQuery } from '@spon/cms/queries/pages/post.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { Post } from '~/templates/Post'
import { createPage } from '~/utils/createPage'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

const { Page, generateMetadata } = createPage({
	params: z.object({
		post: z.string(),
	}),
	loader: async ({ params }) => {
		const runner = createSanityFetcher()
		// sometimes vscode will complain about the type being to deep
		// the type is still created so i think we can safely ignore it
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore Type instantiation is excessively deep and possibly infinite
		const data = await runner(
			postQuery,
			{ slug: params.post },
			{ next: { tags: ['post', params.post] } },
		)
		const page = getFirstOrNull(data.page)

		if (!page) {
			notFound()
		}

		return {
			page: page,
		}
	},
	metadata: async ({ data }) => ({
		title: data.page.title,
	}),
	component: ({ data }) => {
		const props = data.page
		return <Post {...props} />
	},
})

export default Page
export { generateMetadata }
