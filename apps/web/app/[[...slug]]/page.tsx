import * as React from 'react'
import { z } from 'zod'
import { POSTS_PER_PAGE, WP_BLOG_POST_PAGE_ID } from '~/config'
import { createClient } from '~/lib/gqlClient'
import type {
	PageFragment,
	PageIdType,
	PostFragment,
	TeaserPageFragment,
	TeaserPostFragment,
} from '~/schema/generated.graphql'
import { BlogList } from '~/templates/BlogList'
import { HomePage } from '~/templates/HomePage'
import { LandingPage } from '~/templates/LandingPage'
import { ListPage } from '~/templates/ListPage'
import { Post } from '~/templates/Post'
import { createPage } from '~/utils/createPage'
import {
	HOME_TEMPLATE,
	POSTS_TEMPLATE,
	POST_TEMPLATE,
	getPageInfo,
} from '~/utils/getPageInfo'
import { parseContent } from '~/utils/parseContent'
import { parse } from '~/utils/portable/htmlToPortableText'

export const createUri = (nextSlug?: string | string[]) =>
	`/${nextSlug && Array.isArray(nextSlug) ? nextSlug.join('/') : (nextSlug ?? '')}`

const PREVIEW_SLUG = 'preview'

const { Page, generateMetadata } = createPage({
	params: z.object({
		slug: z.array(z.string()).optional(),
	}),
	loader: async ({ params }) => {
		const slug = createUri(params.slug)
		const isPreview = slug.includes(PREVIEW_SLUG)
		const client = createClient(isPreview)
		const realSlug = isPreview ? slug.split(`${PREVIEW_SLUG}/`)[1]! : slug
		const info = await getPageInfo({ isPreview, queryVar: realSlug })
		const queryVars = {
			id: isPreview ? slug.split(`${PREVIEW_SLUG}/`)[1]! : slug,
			idType: (isPreview ? 'DATABASE_ID' : 'URI') as PageIdType,
			asPreview: isPreview,
		} as const

		switch (info.template) {
			case HOME_TEMPLATE: {
				const data = await client.HomePageQuery(queryVars)
				const { seo, ...page } = data.page
				return {
					__template: info.template,
					page: page,
					seo,
				}
			}

			case POST_TEMPLATE: {
				console.log({ POST_TEMPLATE: queryVars })
				const data = await client.PostQuery(queryVars)
				return {
					__template: POST_TEMPLATE,
					page: data.post,
				}
			}

			case POSTS_TEMPLATE: {
				const data = await client.PostsQuery({
					first: POSTS_PER_PAGE,
					id: WP_BLOG_POST_PAGE_ID,
				})
				return {
					__template: info.template,
					posts: data.posts,
					page: data.page,
				}
			}

			case 'Listing': {
				const data = await client.ListingQuery({
					...queryVars,
					parent: String(info.id),
				})
				const { seo, ...page } = data.page
				return {
					__template: 'listing' as const,
					page: page,
					pages: data.pages,
					seo,
				}
			}

			default: {
				const data = await client.PageQuery(queryVars)
				const { seo, ...page } = data.page
				return {
					__template: 'default' as const,
					page: page,
					seo,
				}
			}
		}
	},
	// metadata: async ({ data }) => {
	// 	const { seo } = data

	// 	return {
	// 		title: seo.title,
	// 		description: seo.metaDesc ?? seo.opengraphDescription,
	// 		keywords: seo.metaKeywords,
	// 		openGraph: {
	// 			title: seo.opengraphTitle,
	// 			description: seo.opengraphDescription,
	// 			type: seo.opengraphType,
	// 			images: [seo.opengraphImage?.sourceUrl].filter(Boolean),
	// 			url: seo.opengraphUrl,
	// 		},
	// 		twitter: {
	// 			title: seo.twitterTitle,
	// 			description: seo.twitterDescription,
	// 			images: [seo.twitterImage?.sourceUrl].filter(Boolean),
	// 		},
	// 	}
	// },
	component: async ({ data }) => {
		if (data.page.__typename === 'Post') {
			const { structure } = parse<PostFragment['blog']>(data.page?.blog)

			return <Post structure={parseContent(structure)} />
		}

		if (data.page.__typename === 'Page') {
			switch (data.__template) {
				case 'listing': {
					const { hero, structure } = parse<PageFragment['base']>(
						data.page?.base,
					)
					const pages = data.pages?.edges.map((n) =>
						parse<TeaserPageFragment>(n.node),
					)
					return (
						<ListPage
							hero={hero}
							structure={parseContent(structure)}
							pages={pages ?? []}
						/>
					)
				}
				case POSTS_TEMPLATE: {
					const { hero, structure } = parse<PageFragment['base']>(
						data.page?.base,
					)
					const posts = data.posts?.edges.map((n) =>
						parse<TeaserPostFragment>(n.node),
					)
					const cursor = data.posts?.edges.at(-1)?.cursor
					return (
						<>
							<BlogList
								hero={hero}
								structure={parseContent(structure)}
								posts={posts ?? []}
								cursor={cursor}
							/>
						</>
					)
				}

				case HOME_TEMPLATE: {
					const { hero, structure } = parse<PageFragment['base']>(
						data.page?.base,
					)
					return <HomePage hero={hero} structure={parseContent(structure)} />
				}

				default: {
					const { hero, structure } = parse<PageFragment['base']>(
						data.page?.base,
					)
					return <LandingPage hero={hero} structure={parseContent(structure)} />
				}
			}
		}

		return null
	},
})

export default Page
export { generateMetadata }
