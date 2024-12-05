import { type NextRequest, NextResponse } from 'next/server'
import { POSTS_PER_PAGE } from '~/config'
import { createClient } from '~/lib/gqlClient'
import type { BlogTeaserPageFragment } from '~/schema/generated.graphql'
import { parse } from '~/utils/portable/htmlToPortableText'

export async function GET(
	_: NextRequest,
	{ params }: { params: { params: string[] } },
) {
	try {
		const [cursor, count = POSTS_PER_PAGE] = params.params
		const first = Number(count)

		const data = await createClient().PostsQueryPagination({
			after: cursor!,
			first,
		})

		const posts = data.posts.edges.map((n) =>
			parse<BlogTeaserPageFragment>(n.node),
		)

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
