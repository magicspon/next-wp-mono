import { notFound } from 'next/navigation'
import { WP_BLOG_PREFIX } from '~/config'
import { createClient } from '~/lib/gqlClient'
import type { ContentNodeIdTypeEnum } from '~/schema/generated.graphql'

export const HOME_TEMPLATE = '__HOME__'
export const POSTS_TEMPLATE = '__POSTS__'
export const POST_TEMPLATE = '__POST__'

export async function getPageInfo({
	isPreview,
	queryVar,
}: {
	isPreview: boolean
	queryVar: string
}) {
	try {
		const client = createClient(isPreview)

		const { contentNode, nodeByUri } = await client.ContentInfo({
			slug: queryVar.includes(WP_BLOG_PREFIX)
				? queryVar.split('/').at(-1)!
				: queryVar,
			uri: queryVar,
			idType: (isPreview ? 'DATABASE_ID' : 'URI') as ContentNodeIdTypeEnum,
		})

		if (contentNode) {
			const template = contentNode.isPostsPage
				? POSTS_TEMPLATE
				: contentNode.isFrontPage
					? HOME_TEMPLATE
					: contentNode.__typename === 'Page'
						? contentNode.template.templateName
						: contentNode.__typename === 'Post'
							? POST_TEMPLATE
							: 'default'

			return {
				template,
				id: contentNode.id,
			}
		}

		return {
			id: nodeByUri.id,
			template: nodeByUri.isPostsPage ? POSTS_TEMPLATE : HOME_TEMPLATE,
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err: unknown) {
		notFound()
	}
}
