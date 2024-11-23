import { type NextRequest, NextResponse } from 'next/server'
import { POSTS_PER_PAGE } from '~/config'
import { createClient } from '~/lib/gqlClient'
import type { TeaserPostFragment } from '~/schema/generated.graphql'
import { parse } from '~/utils/portable/htmlToPortableText'

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url)
		const cursor = url.searchParams.get('cursor')
		const count = url.searchParams.get('count') ?? 1
		const from = Number(count)

		const data = await createClient().PostsQueryPagination({
			after: cursor!,
			first: from ?? POSTS_PER_PAGE,
		})

		const posts = data.posts.edges.map((n) => parse<TeaserPostFragment>(n.node))

		return NextResponse.json({
			pages: posts,
			nextId: data.posts.edges.at(-1)?.cursor,
			previousId: cursor,
		})
	} catch (err: any) {
		console.error(err)
		return new Response(err.message, { status: 404 })
	}
}
