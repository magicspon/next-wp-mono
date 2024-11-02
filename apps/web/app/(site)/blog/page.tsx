import * as React from 'react'
import { sdk } from '~/lib/gqlClient'
import { BlogList } from '~/templates/BlogList'
import { createPage } from '~/utils/createPage'

const { Page, generateMetadata } = createPage({
	loader: async () => {
		const data = await sdk.PostsQuery({ first: 10 })

		return {
			page: data.page,
			posts: data.posts.edges.map((e) => e.node),
		}
	},
	metadata: async ({ data }) => {
		return {
			title: data.page.title,
		}
	},
	component: async ({ data }) => {
		return <BlogList posts={data.posts} page={data.page} />
	},
})

export default Page

export { generateMetadata }
