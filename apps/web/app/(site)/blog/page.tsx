import { notFound } from 'next/navigation'
import * as React from 'react'
import { blogQuery } from '@spon/cms/queries/pages/blog.query'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { BlogList } from '~/templates/BlogList'
import { createPage } from '~/utils/createPage'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

const { Page, generateMetadata } = createPage({
	loader: async () => {
		const runner = createSanityFetcher()
		// sometimes vscode will complain about the type being to deep
		// the type is still created so i think we can safely ignore it
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore Type instantiation is excessively deep and possibly infinite
		const data = await runner(blogQuery, {}, { next: { tags: ['listing'] } })
		const page = getFirstOrNull(data.page)

		if (!page) {
			notFound()
		}

		return {
			page: page,
			posts: data.posts,
			total: data.total,
		}
	},
	metadata: async ({ data }) => ({
		title: data.page.title,
	}),
	component: ({ data }) => {
		const props = data.page
		const posts = data.posts
		const total = data.total as number
		return <BlogList total={total} {...props} posts={posts} />
	},
})

export default Page
export { generateMetadata }
